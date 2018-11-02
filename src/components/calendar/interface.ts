export interface Props {
  format?: string

  minDate?: DateArg

  maxDate?: DateArg

  currentDate?: DateArg

  isSlider?: boolean

  marks?: Array<Mark>

  onClick?: (item: Item) => void

  onLongClick?: (item: Item) => void
}

export interface DefaultProps {
  format: string

  isSlider: boolean

  marks: Array<Mark>

  currentDate: DateArg
}

export interface State {
  generateDate: DateArg

  selectedDate: DateArg
}

export type PropsWithDefaults = Props & DefaultProps
