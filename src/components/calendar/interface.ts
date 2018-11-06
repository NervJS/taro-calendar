export interface Props {
  format?: string

  minDate?: DateArg

  maxDate?: DateArg

  isSlider?: boolean

  marks?: Array<Mark>

  monthFormat?: string

  hideArrow?: boolean

  currentDate?: DateArg

  onClickPreMonth?: () => void

  onClickNextMonth?: () => void

  onDayClick?: (item: Item) => void

  onDayLongClick?: (item: Item) => void

  onMonthChange?: (value: string) => void
}

export interface DefaultProps {
  format: string

  isSlider: boolean

  marks: Array<Mark>

  currentDate: DateArg

  monthFormat: string

  hideArrow: boolean
}

export interface State {
  generateDate: number

  selectedDate: number
}

export type PropsWithDefaults = Props & DefaultProps
