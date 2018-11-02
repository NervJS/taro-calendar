import dayjs from 'dayjs'
import _flow from 'lodash/flow'
import _chunk from 'lodash/chunk'

import plugins from './plugins'
import * as constant from './constant'

function getFullItem (
  item: Partial<Item>,
  options: GroupOptions,
  selectedDate: DateArg,
  isShowStatus?: boolean
) {
  if (!isShowStatus) return item
  return _flow(plugins)({
    item,
    options,
    selectedDate
  })
}

export default function generateCalendarGroup (
  options: GroupOptions
): (
    generateDate: DateArg,
    selectedDate: DateArg,
    isShowStatus?: boolean
  ) => Group<Item> {
  return function (
    generateDate: DateArg,
    selectedDate: DateArg,
    isShowStatus?: boolean
  ): Group<Item> {
    const date = dayjs(generateDate)

    const { format } = options

    // 获取生成日期的第一天 和 最后一天
    const firstDate = date.startOf('month')
    const lastDate = date.endOf('month')

    const preMonthDate = date.subtract(1, 'month')

    const list: List<Item> = []

    const nowMonthDays: number = date.daysInMonth() // 获取这个月有多少天
    const preMonthLastDay = preMonthDate.endOf('month').day() // 获取上个月最后一天是周几

    // 生成上个月的日期
    for (let i = 1; i <= preMonthLastDay + 1; i++) {
      const thisDate = firstDate.subtract(i, 'day').startOf('day')

      let item = {
        text: thisDate.date(),
        type: constant.TYPE_PRE_MONTH,
        value: thisDate.format(format),
        _value: thisDate
      }

      item = getFullItem(item, options, selectedDate, isShowStatus)

      list.push(item)
    }
    list.reverse()

    // 生成这个月的日期
    for (let i = 0; i < nowMonthDays; i++) {
      const thisDate = firstDate.add(i, 'day').startOf('day')
      let item = {
        text: thisDate.date(),
        type: constant.TYPE_NOW_MONTH,
        value: thisDate.format(format),
        _value: thisDate
      }

      item = getFullItem(item, options, selectedDate, isShowStatus)

      list.push(item)
    }

    // 生成下个月的日期
    let i = 1
    const total = Math.ceil(list.length / 7) * 7
    while (list.length < total) {
      const thisDate = lastDate.add(i++, 'day').startOf('day')
      let item = {
        text: thisDate.date(),
        type: constant.TYPE_NEXT_MONTH,
        value: thisDate.format(format),
        _value: thisDate
      }

      item = getFullItem(item, options, selectedDate, isShowStatus)

      list.push(item)
    }

    return _chunk(list, 7)
  }
}

export function getGenerateDate (date: DateArg | undefined): DateArg {
  return dayjs(date)
    .startOf('month')
    .valueOf()
}
