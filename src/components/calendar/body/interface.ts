import { DefaultProps as _DefaultProps } from '../interface'

export interface Props {
  format: string

  marks: Array<Mark>

  isSlider: boolean

  minDate?: DateArg

  maxDate?: DateArg

  generateDate: DateArg

  selectedDate: DateArg

  onPreMonth: () => void

  onNextMonth: () => void

  onClick: (item: Item) => void

  onLongClick: (item: Item) => void
}

export interface State {
  isAnimate: boolean

  offsetSize: number

  preDateGroup: Group<Item> | []

  nowDateGroup: Group<Item> | []

  nextDateGroup: Group<Item> | []
}

export type PropsWithDefaults = Props & DefaultProps
