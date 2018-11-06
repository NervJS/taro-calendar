/// <reference path='../../types.d.ts' />

import dayjs from 'dayjs'
import classnames from 'classnames'
import _chunk from 'lodash/chunk'
import _throttle from 'lodash/throttle'

import Taro from '@tarojs/taro'
import bind from 'bind-decorator'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { ITouchEvent, BaseEvent } from '@tarojs/components/types/common'

import AtCalendarGroup from '../../ui/list/index'
import AtCalendarHeader from '../../ui/header/index'
import generateCalendarGroup from '../../common/helper'
import { Props, State, ListGroup } from './interface'

import './index.scss'

const ANIMTE_DURATION: number = 300

const defaultProps: Partial<Props> = {
  marks: [],
  format: 'YYYY-MM-DD',
  generateDate: Date.now(),
  selectedDate: Date.now(),
  onClick: () => {}
}

export default class AtCalendarBody extends Taro.Component<
  Props,
  Readonly<State>
  > {
  static defaultProps: Partial<Props> = defaultProps

  private action: string = ''
  private current: number = 1
  private startX: number = 0
  private maxWidth: number = 0
  private isTouching: boolean = false

  private generateFunc: (
    generateDate: DateArg,
    selectedDate: DateArg,
    isShowStatus?: boolean
  ) => List<Item>

  constructor (props) {
    super(...arguments)
    const {
      marks,
      format,
      minDate,
      maxDate,
      generateDate,
      selectedDate
    } = props

    this.generateFunc = generateCalendarGroup({
      format,
      minDate,
      maxDate,
      marks
    })
    const listGroup = this.getGroups(generateDate, selectedDate)

    this.state = {
      offsetSize: 0,
      isAnimate: false,
      listGroup
    }
  }

  @bind
  private getGroups (generateDate: DateArg, selectedDate: DateArg): ListGroup {
    const dayjsDate = dayjs(generateDate)
    const arr: ListGroup = []
    const preList: List<Item> = this.generateFunc(
      dayjsDate.subtract(1, 'month').valueOf(),
      selectedDate
    )

    const nowList: List<Item> = this.generateFunc(
      generateDate,
      selectedDate,
      true
    )

    const nextList: List<Item> = this.generateFunc(
      dayjsDate.add(1, 'month').valueOf(),
      selectedDate
    )

    const preListIndex = this.current === 0 ? 2 : this.current - 1
    const nextListIndex = this.current === 2 ? 0 : this.current + 1

    arr[preListIndex] = preList
    arr[this.current] = nowList
    arr[nextListIndex] = nextList

    return arr
  }

  componentWillReceiveProps (nextProps: Props) {
    const {
      marks,
      format,
      minDate,
      maxDate,
      generateDate,
      selectedDate
    } = nextProps

    this.generateFunc = generateCalendarGroup({
      format,
      minDate,
      maxDate,
      marks
    })
    const listGroup = this.getGroups(generateDate, selectedDate)

    this.setState({
      offsetSize: 0,
      listGroup
    })
  }

  componentDidMount () {
    const selector = Taro.createSelectorQuery().in(this.$scope)
    selector
      .select('.at-calendar-slider__main')
      .fields({
        size: true
      })
      .exec(res => {
        this.maxWidth = res[0].width
      })
  }

  @bind
  private handleTouchStart (e: ITouchEvent) {
    if (!this.props.isSlider) {
      return
    }
    this.isTouching = true
    this.startX = e.touches[0].clientX
  }

  private handleTouchMove = (e: ITouchEvent) => {
    if (!this.props.isSlider) {
      return
    }
    if (!this.isTouching) return

    const { clientX } = e.touches[0]
    const offsetSize = clientX - this.startX

    this.setState({
      offsetSize
    })
  }

  private animateMoveSlide (offset: number, callback?: Function) {
    this.setState(
      {
        isAnimate: true
      },
      () => {
        this.setState({
          offsetSize: offset
        })
        setTimeout(() => {
          this.setState(
            {
              isAnimate: false
            },
            () => {
              callback && callback()
            }
          )
        }, ANIMTE_DURATION)
      }
    )
  }

  @bind
  private handleTouchEnd () {
    if (!this.props.isSlider) {
      return
    }

    const { offsetSize } = this.state

    this.isTouching = false
    const isRight = offsetSize > 0

    const breakpoint = this.maxWidth / 2
    const absOffsetSize = Math.abs(offsetSize)

    if (absOffsetSize > breakpoint) {
      const res = isRight ? this.maxWidth : -this.maxWidth
      return this.animateMoveSlide(res, () => {
        isRight ? this.props.onPreMonth() : this.props.onNextMonth()
      })
    }
    this.animateMoveSlide(0)
  }

  @bind
  private handleChange (e: BaseEvent & { detail: { current: number } }) {
    const { current } = e.detail
    const distance = current - this.current
    this.action = distance === 1 || distance === -2 ? 'nextMonth' : 'preMonth'
    this.current = current

    console.log(this.action, this.current)
    setTimeout(() => {
      this.action === 'nextMonth'
        ? this.props.onNextMonth()
        : this.props.onPreMonth()
    }, 500)
  }

  render () {
    const { isSlider } = this.props
    const { isAnimate, offsetSize, listGroup } = this.state

    /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
    if (process.env.TARO_ENV === 'h5') {
      return (
        <View
          className='at-calendar-slider__main main'
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          <AtCalendarHeader />
          <View
            className={classnames('main__body  body', {
              'main__body--slider': isSlider,
              'main__body--animate': isAnimate
            })}
            style={{
              transform: isSlider
                ? `translateX(-100%) translate3d(${offsetSize},0,0)`
                : '',
              WebkitTransform: isSlider
                ? `translateX(-100%) translate3d(${offsetSize}px,0,0)`
                : ''
            }}
          >
            {isSlider ? (
              <View className='body__slider body__slider--pre'>
                <AtCalendarGroup list={listGroup[0]} />
              </View>
            ) : null}
            <View className='body__slider body__slider--now'>
              <AtCalendarGroup
                list={listGroup[1]}
                onClick={this.props.onClick}
                onLongClick={this.props.onLongClick}
              />
            </View>
            {isSlider ? (
              <View className='body__slider body__slider--next'>
                <AtCalendarGroup list={listGroup[2]} />
              </View>
            ) : null}
          </View>
        </View>
      )
    }

    return (
      <View className='at-calendar-slider__main main'>
        <AtCalendarHeader />
        <Swiper
          circular
          current={1}
          className='main__body'
          onChange={this.handleChange}
        >
          {listGroup.map((item, key) => (
            <SwiperItem key={key} itemId={key.toString()}>
              <AtCalendarGroup
                list={item}
                onClick={this.props.onClick}
                onLongClick={this.props.onLongClick}
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
