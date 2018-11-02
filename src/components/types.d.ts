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

    marks?: Array<Mark>

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

  type Group < T > = Array<List<T>>
}

// import { ITouchEvent } from '@tarojs/components/types/common'

// export = Calendar
// export as namespace Calendar

// declare namespace Calendar {
//   type DateArg = string | number | Date

// interface Mark {
//   value: DateArg
// }

//   interface DefaultProps {
//     format: string

//     marks: Array<Mark>

//     currentDate: DateArg
//   }

//   interface Props {
//     mode?: string

//     format?: string

//     minDate?: DateArg

//     maxDate?: DateArg

//     currentDate?: DateArg

//     marks?: Array<Mark>

//     onClick?: (item: Calendar.Body.Item) => void

//     onLongClick?: (item: Calendar.Body.Item) => void
//   }

//   interface State {
//     generateDate: DateArg

//     selectedDate: DateArg
//   }

//   type PropsWithDefaults = Props & DefaultProps

//   namespace Controller {
//     interface Props {
//       onClickPre: (isDisabled: boolean) => void

//       onClickNext: (isDisabled: boolean) => void

//       minDate: DateArg | undefined

//       maxDate: DateArg | undefined

//       generateDate: DateArg
//     }

//     interface State {}
//   }

//   namespace Body {
//     type List < T > = Array<T>

//     type Group < T > = Array<List<T>>

//     interface Props {
//       format: string

//       marks: Array<Mark>

//       minDate: DateArg | undefined

//       maxDate: DateArg | undefined

//       generateDate: DateArg

//       selectedDate: DateArg

//       onPreMonth: () => void

//       onNextMonth: () => void

//       onClick: (item: Calendar.Body.Item) => void

//       onLongClick: (item: Calendar.Body.Item) => void
//     }

//     interface State {
//       isAnimate: boolean

//       offsetSize: number

//       preDateGroup: Group<Item> | []

//       nowDateGroup: Group<Item> | []

//       nextDateGroup: Group<Item> | []
//     }

//     interface Options {
//       marks: Array<Mark>

//       format: string

//       minDate?: DateArg

//       maxDate?: DateArg
//     }
//   }
// }
