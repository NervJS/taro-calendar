/// <reference path='../../types.d.ts' />

import classnames from 'classnames'

import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'

import './index.scss'

export default class AtCalendarController extends Taro.Component<
  Calendar.Controller.Props,
  Calendar.Controller.State
  > {
  static defaultProps: Partial<Calendar.Controller.Props> = {}

  readonly state: Readonly<Calendar.Controller.State> = {}

  render () {
    const { generateDate, minDate, maxDate } = this.props

    const isMinMonth =
      !!minDate &&
      dayjs(minDate)
        .startOf('month')
        .isSame(dayjs(generateDate))

    const isMaxMonth =
      !!maxDate &&
      dayjs(maxDate)
        .startOf('month')
        .isSame(dayjs(generateDate))

    return (
      <View className='at-calendar__controller controller'>
        <View
          className={classnames('controller__arrow controller__arrow--left', {
            'controller__arrow--disabled': isMinMonth
          })}
          onClick={this.props.onClickPre.bind(this, isMinMonth)}
        />
        <Text className='controller__info'>
          {dayjs(generateDate).format('YYYY年MM月')}
        </Text>
        <View
          className={classnames('controller__arrow controller__arrow--right', {
            'controller__arrow--disabled': isMaxMonth
          })}
          onClick={this.props.onClickNext.bind(this, isMaxMonth)}
        />
      </View>
    )
  }
}
