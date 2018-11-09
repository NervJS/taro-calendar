export interface Props {
  format?: string

  minDate?: DateArg

  maxDate?: DateArg

  isSwiper?: boolean

  marks?: Array<Mark>

  monthFormat?: string

  hideArrow?: boolean

  isVertical?: boolean

  currentDate?: DateArg

  className?: classNameType

  onClickPreMonth?: () => void

  onClickNextMonth?: () => void

  onDayClick?: (item: Item) => void

  onDayLongClick?: (item: Item) => void

  onMonthChange?: (value: string) => void
}

export interface DefaultProps {
  format: string

  isSwiper: boolean

  marks: Array<Mark>

  currentDate: DateArg

  monthFormat: string

  hideArrow: boolean

  isVertical: boolean
}

export interface State {
  generateDate: number

  selectedDate: number
}

export type PropsWithDefaults = Props & DefaultProps
