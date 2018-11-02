export interface Props {
  onClickPre: (isDisabled: boolean) => void

  onClickNext: (isDisabled: boolean) => void

  minDate: DateArg | undefined

  maxDate: DateArg | undefined

  generateDate: DateArg
}

export interface State {}
