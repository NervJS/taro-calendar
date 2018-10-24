import Taro from '@tarojs/taro'

import { View } from '@tarojs/components'

export interface AtCalendarProps {
  title: string
}

export interface AtCalendarState {}

const defaultProps: AtCalendarProps = {
  title: ''
}

export default class AtCalendar extends Taro.Component<
  AtCalendarProps,
  AtCalendarState
  > {
  static defaultProps: AtCalendarProps = defaultProps

  readonly state: Readonly<AtCalendarState> = {}

  render () {
    return <View>{this.props.title}</View>
  }
}
