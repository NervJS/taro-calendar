/// <reference path='../../types.d.ts' />

import dayjs from 'dayjs'
import classnames from 'classnames'
import _chunk from 'lodash/chunk'
import _throttle from 'lodash/throttle'

import Taro from '@tarojs/taro'
import bind from 'bind-decorator'
import { View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'

import AtCalendarGroup from '../../ui/list/index'
import AtCalendarHeader from '../../ui/header/index'
import generateCalendarGroup from '../../common/helper'
import { Props, State } from './interface'

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
    const groupInfo = this.getGroups(generateDate, selectedDate)

    this.state = {
      offsetSize: 0,
      isAnimate: false,
      ...groupInfo
    }
  }

  private getGroups (generateDate: DateArg, selectedDate: DateArg) {
    const dayjsDate = dayjs(generateDate)
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

    return {
      preList,
      nowList,
      nextList
    }
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
    const groupInfo = this.getGroups(generateDate, selectedDate)

    this.setState({
      offsetSize: 0,
      ...groupInfo
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

  render () {
    const { isSlider } = this.props
    const { isAnimate, offsetSize, preList, nowList, nextList } = this.state

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
              <AtCalendarGroup list={preList} />
            </View>
          ) : null}
          <View className='body__slider body__slider--now'>
            <AtCalendarGroup
              list={nowList}
              onClick={this.props.onClick}
              onLongClick={this.props.onLongClick}
            />
          </View>
          {isSlider ? (
            <View className='body__slider body__slider--next'>
              <AtCalendarGroup list={nextList} />
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}
