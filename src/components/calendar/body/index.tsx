/// <reference path='../../types.d.ts' />

import dayjs from 'dayjs'
import bind from 'bind-decorator'
import _chunk from 'lodash/chunk'

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import AtCalendarHeader from '../../base/header/index'
import AtCalendarGroup from '../../base/group/index'

import './index.scss'

export default class AtCalendarBody extends Taro.Component<
  Calendar.Body.Props,
  Calendar.Body.State
  > {
  readonly state: Readonly<Calendar.Body.State> = {}

  @bind
  private generateCalendarGroup (
    generateDate: Calendar.DateArg,
    currentDate: Calendar.DateArg,
    format: string,
    options: Calendar.Body.Options
  ): Calendar.Body.Group<Calendar.Body.Item> {
    const { minDate, maxDate } = options

    const date = dayjs(generateDate)
    const nowDate = dayjs(currentDate)

    const dayjsMinDate = dayjs(minDate)
    const dayjsMaxDate = dayjs(maxDate)

    // 获取生成日期的第一天 和 最后一天
    const firstDate = date.startOf('month')
    const lastDate = date.endOf('month')

    const preMonthDate = date.subtract(1, 'month')

    const list: Calendar.Body.List<Calendar.Body.Item> = []

    const nowMonthDays: number = date.daysInMonth() // 获取这个月有多少天
    const preMonthLastDay = preMonthDate.endOf('month').day() // 获取上个月最后一天是周几

    // 生成上个月的日期
    for (let i = 1; i <= preMonthLastDay + 1; i++) {
      const thisDate = firstDate.subtract(i, 'day')
      list.push({
        isDisabled: true,
        text: thisDate.date(),
        value: thisDate.format(format)
      })
    }
    list.reverse()

    // 生成这个月的日期
    for (let i = 0; i < nowMonthDays; i++) {
      const thisDate = firstDate.add(i, 'day')
      const duration = thisDate.diff(nowDate, 'day', true)
      const isDisabled =
        !!(minDate && thisDate.isBefore(dayjsMinDate)) ||
        !!(maxDate && thisDate.isAfter(dayjsMaxDate))
      const item = {
        isDisabled,
        text: thisDate.date(),
        value: thisDate.format(format),
        isActive: duration < 0 && duration > -1
      }
      list.push(item)
    }

    // 生成下个月的日期
    let i = 1
    const total = Math.ceil(list.length / 7) * 7
    while (list.length < total) {
      const thisDate = lastDate.add(i++, 'day')
      list.push({
        isDisabled: true,
        text: thisDate.date(),
        value: thisDate.format(format)
      })
    }

    return _chunk(list, 7)
  }

  render () {
    const {
      generateDate,
      currentDate,
      format,
      mode,
      minDate,
      maxDate
    } = this.props

    const nowDateGroup: Calendar.Body.Group<
    Calendar.Body.Item
    > = this.generateCalendarGroup(generateDate, currentDate, format, {
      minDate,
      maxDate
    })

    return (
      <View className='at-calendar__main main'>
        <AtCalendarHeader />
        <View className='main__body body body'>
          <View className='body__slider body__slider--now'>
            <AtCalendarGroup
              groupData={nowDateGroup}
              onClick={this.props.onClick}
              onLongClick={this.props.onLongClick}
            />
          </View>
        </View>
      </View>
    )
  }
}
