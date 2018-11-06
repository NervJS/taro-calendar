/// <reference path='../../types.d.ts' />

import dayjs from 'dayjs'
import classnames from 'classnames'
import _chunk from 'lodash/chunk'
import _throttle from 'lodash/throttle'

import Taro from '@tarojs/taro'
import bind from 'bind-decorator'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { ITouchEvent, BaseEvent, ITouch } from '@tarojs/components/types/common'

import AtCalendarList from '../../ui/list/index'
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

  private current: number = 1
  private startX: number = 0
  private swipeStartPoint: number = 0
  private isPreMonth: boolean = false
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
      listGroup,
      offsetSize: 0,
      isAnimate: false
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
    if (!this.props.isSwiper) {
      return
    }
    this.isTouching = true
    this.startX = e.touches[0].clientX
  }

  private handleTouchMove = (e: ITouchEvent) => {
    if (!this.props.isSwiper) {
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
    if (!this.props.isSwiper) {
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

    this.current = current

    setTimeout(() => {
      this.isPreMonth ? this.props.onPreMonth() : this.props.onNextMonth()
    }, 500)
  }

  @bind
  private handleSwipeTouchStart (
    e: ITouchEvent & { changedTouches: Array<ITouch> }
  ) {
    const { clientY, clientX } = e.changedTouches[0]
    this.swipeStartPoint = this.props.isVertical ? clientY : clientX
  }

  @bind
  private handleSwipeTouchEnd (
    e: ITouchEvent & { changedTouches: Array<ITouch> }
  ) {
    const { clientY, clientX } = e.changedTouches[0]
    this.isPreMonth = this.props.isVertical
      ? clientY - this.swipeStartPoint > 0
      : clientX - this.swipeStartPoint > 0
  }

  render () {
    const { isSwiper } = this.props
    const { isAnimate, offsetSize, listGroup } = this.state

    if (!isSwiper) {
      return (
        <View
          className={classnames(
            'at-calendar-slider__main',
            'main',
            `at-calendar-slider__main--${process.env.TARO_ENV}`
          )}
        >
          <AtCalendarHeader />
          <View className='main__body body'>
            <View className='body__slider body__slider--now'>
              <AtCalendarList list={listGroup[1]} />
            </View>
          </View>
        </View>
      )
    }

    /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
    if (process.env.TARO_ENV === 'h5') {
      return (
        <View
          className={classnames(
            'at-calendar-slider__main',
            'main',
            `at-calendar-slider__main--${process.env.TARO_ENV}`
          )}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          <AtCalendarHeader />
          <View
            className={classnames('main__body  body', {
              'main__body--slider': isSwiper,
              'main__body--animate': isAnimate
            })}
            style={{
              transform: isSwiper
                ? `translateX(-100%) translate3d(${offsetSize},0,0)`
                : '',
              WebkitTransform: isSwiper
                ? `translateX(-100%) translate3d(${offsetSize}px,0,0)`
                : ''
            }}
          >
            <View className='body__slider body__slider--pre'>
              <AtCalendarList list={listGroup[0]} />
            </View>
            <View className='body__slider body__slider--now'>
              <AtCalendarList
                list={listGroup[1]}
                onClick={this.props.onClick}
                onLongClick={this.props.onLongClick}
              />
            </View>
            <View className='body__slider body__slider--next'>
              <AtCalendarList list={listGroup[2]} />
            </View>
          </View>
        </View>
      )
    }

    return (
      <View
        className={classnames(
          'at-calendar-slider__main',
          'main',
          `at-calendar-slider__main--${process.env.TARO_ENV}`
        )}
      >
        <AtCalendarHeader />
        <Swiper
          circular
          current={1}
          className='main__body'
          onChange={this.handleChange}
          vertical={this.props.isVertical}
          onTouchEnd={this.handleSwipeTouchEnd}
          onTouchStart={this.handleSwipeTouchStart}
        >
          {listGroup.map((item, key) => (
            <SwiperItem key={key} itemId={key.toString()}>
              <AtCalendarList
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
