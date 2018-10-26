/// <reference path='../../node_modules/dayjs/index.d.ts' />

declare namespace Calendar {
  type DateArg = string | number | Date

  interface DefaultProps {
    format: string

    currentDate: DateArg
  }

  interface Props {
    mode?: string

    format?: string

    minDate?: DateArg

    maxDate?: DateArg

    currentDate?: DateArg

    selectDates?: Array<DateArg>

    onClick?: (item: Calendar.Body.Item) => void

    onLongClick?: (item: Calendar.Body.Item) => void
  }

  type PropsWithDefaults = Props & DefaultProps

  interface State {
    generateDate: DateArg
  }

  namespace Controller {
    interface Props {
      onClickPre: (isDisabled: boolean) => void

      onClickNext: (isDisabled: boolean) => void

      minDate: DateArg | undefined

      maxDate: DateArg | undefined

      generateDate: DateArg
    }

    interface State {}
  }

  namespace Body {
    interface Props {
      mode?: string

      format: string

      minDate: DateArg | undefined

      maxDate: DateArg | undefined

      currentDate: DateArg

      generateDate: DateArg

      selectDates?: Array<DateArg>

      onClick: (item: Calendar.Body.Item) => void

      onLongClick: (item: Calendar.Body.Item) => void
    }

    interface State {}

    interface Item {
      value: string

      text: number

      isActive?: boolean

      isDisabled?: boolean
    }

    interface Options {
      minDate: DateArg | undefined

      maxDate: DateArg | undefined
    }

    type List < T > = Array<T>

    type Group < T > = Array<List<T>>
  }
}
