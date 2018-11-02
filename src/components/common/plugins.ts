import dayjs from 'dayjs'

import * as constant from './constant'

interface PluginArg {
  item: Item

  options: GroupOptions

  selectedDate: DateArg
}

export function handleActive (args: PluginArg): PluginArg {
  const { item, selectedDate } = args
  const { _value } = item

  const duration = _value.diff(dayjs(selectedDate), 'day')

  item.isActive = duration === 0
  item.isToday = _value.diff(dayjs(Date.now()).startOf('day'), 'day') === 0

  return args
}

export function handleMarks (args: PluginArg): PluginArg {
  const { item, options } = args
  const { _value } = item
  const { marks } = options

  const markList = marks.filter(mark => dayjs(mark.value).isSame(_value))

  item.marks = markList.slice(0, 1)

  return args
}

export function handleDisabled (args: PluginArg): Item {
  const { item, options } = args
  const { _value } = item
  const { minDate, maxDate } = options

  const dayjsMinDate = dayjs(minDate)
  const dayjsMaxDate = dayjs(maxDate)

  item.isDisabled =
    !!(minDate && _value.isBefore(dayjsMinDate)) ||
    !!(maxDate && _value.isAfter(dayjsMaxDate))

  return item
}

export default [handleActive, handleMarks, handleDisabled]
