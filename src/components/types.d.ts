import dayjs from 'dayjs'

declare global {
  type DateArg = string | number | Date

  interface Mark {
    value: DateArg
  }

  interface Item {
    value: string

    _value: dayjs.Dayjs

    text: number

    type: number

    marks: Array<Mark>

    isActive?: boolean

    isToday?: boolean

    isBeforeMin?: boolean

    isAfterMax?: boolean

    isDisabled?: boolean
  }

  interface GroupOptions {
    marks: Array<Mark>

    format: string

    minDate?: DateArg

    maxDate?: DateArg
  }

  type List < T > = Array<T>
}
