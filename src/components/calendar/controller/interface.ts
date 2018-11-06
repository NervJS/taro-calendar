import { BaseEvent } from '@tarojs/components/types/common'

export interface Props {
  generateDate: DateArg

  minDate?: DateArg

  maxDate?: DateArg

  hideArrow: boolean

  monthFormat: string

  onPreMonth: () => void

  onNextMonth: () => void

  onSelectDate: (e: BaseEvent) => void
}

export interface State {}
