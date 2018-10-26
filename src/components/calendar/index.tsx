/// <reference path='../types.d.ts' />

import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import bind from 'bind-decorator'
import _isFunction from 'lodash/isFunction'

import { View } from '@tarojs/components'
import AtCalendarBody from './body/index'
import AtCalendarController from './controller/index'

import './index.scss'

const defaultProps: Calendar.DefaultProps = {
  format: 'YYYY年MM月DD',
  currentDate: Date.now()
}

export default class AtCalendar extends Taro.Component<
  Calendar.Props,
  Calendar.State
  > {
  static defaultProps: Calendar.DefaultProps = defaultProps

  readonly state: Readonly<Calendar.State> = {
    generateDate: dayjs(this.props.currentDate)
      .startOf('month')
      .valueOf()
  }

  @bind
  private handleClickPre (isDisabled: boolean): void {
    const { generateDate } = this.state

    if (isDisabled) {
      return
    }

    this.setState({
      generateDate: dayjs(generateDate)
        .subtract(1, 'month')
        .valueOf()
    })
  }

  @bind
  private handleClickNext (isDisabled: boolean): void {
    const { generateDate } = this.state

    if (isDisabled) {
      return
    }

    this.setState({
      generateDate: dayjs(generateDate)
        .add(1, 'month')
        .valueOf()
    })
  }

  @bind
  private handleClick (item: Calendar.Body.Item) {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(item)
    }
  }

  @bind
  private handleLongClick (item: Calendar.Body.Item) {
    if (_isFunction(this.props.onLongClick)) {
      this.props.onLongClick(item)
    }
  }

  render () {
    const { generateDate } = this.state
    const { format, currentDate, selectDates, minDate, maxDate } = this
      .props as Calendar.PropsWithDefaults

    return (
      <View className='at-calender'>
        <View className='at-calender__controller'>
          <AtCalendarController
            minDate={minDate}
            maxDate={maxDate}
            generateDate={generateDate}
            onClickPre={this.handleClickPre}
            onClickNext={this.handleClickNext}
          />
        </View>
        <View className='at-calender__body'>
          <AtCalendarBody
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            onClick={this.handleClick}
            onLongClick={this.handleLongClick}
            selectDates={selectDates}
            currentDate={currentDate}
            generateDate={generateDate}
          />
        </View>
      </View>
    )
  }
}
