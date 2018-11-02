import dayjs from 'dayjs'
import classnames from 'classnames'

import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'

import { Props, State } from './interface'

import './index.scss'

export default class AtCalendarController extends Taro.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    generateDate: Date.now()
  }

  readonly state: Readonly<State> = {}

  render () {
    const { generateDate, minDate, maxDate } = this.props

    const dayjsDate = dayjs(generateDate)
    const dayjsMindate = dayjs(minDate)
    const dayjsMaxdate = dayjs(maxDate)

    const isMinMonth =
      dayjsMindate.isValid() && dayjsMindate.startOf('month').isSame(dayjsDate)

    const isMaxMonth =
      dayjsMaxdate.isValid() && dayjsMaxdate.startOf('month').isSame(dayjsDate)

    return (
      <View className='at-calendar__controller controller'>
        <View
          className={classnames('controller__arrow controller__arrow--left', {
            'controller__arrow--disabled': isMinMonth
          })}
          onClick={this.props.onClickPre.bind(this, isMinMonth)}
        />
        <Text className='controller__info'>
          {dayjsDate.format('YYYY年MM月')}
        </Text>
        <View
          className={classnames('controller__arrow controller__arrow--right', {
            'controller__arrow--disabled': isMaxMonth
          })}
          onClick={this.props.onClickNext.bind(this, isMaxMonth)}
        />
      </View>
    )
  }
}
