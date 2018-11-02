import dayjs from 'dayjs'
import Taro from '@tarojs/taro'
import bind from 'bind-decorator'
import _isFunction from 'lodash/isFunction'

import { View } from '@tarojs/components'
import AtCalendarBody from './body/index'
import { getGenerateDate } from '../common/helper'
import AtCalendarController from './controller/index'
import { DefaultProps, Props, State, PropsWithDefaults } from './interface'

import './index.scss'

const defaultProps: DefaultProps = {
  marks: [],
  isSlider: false,
  format: 'YYYY-MM-DD',
  currentDate: Date.now()
}

export default class AtCalendar extends Taro.Component<Props, State> {
  static defaultProps: DefaultProps = defaultProps

  readonly state: Readonly<State> = {
    selectedDate: dayjs(this.props.currentDate)
      .startOf('day')
      .valueOf(),
    generateDate: getGenerateDate(this.props.currentDate)
  }

  @bind
  private handleClickPre (isDisabled?: boolean): void {
    const { generateDate } = this.state

    if (isDisabled === true) {
      return
    }

    this.setState({
      generateDate: dayjs(generateDate)
        .subtract(1, 'month')
        .valueOf()
    })
  }

  @bind
  private handleClickNext (isDisabled?: boolean): void {
    const { generateDate } = this.state

    if (isDisabled === true) {
      return
    }

    this.setState({
      generateDate: dayjs(generateDate)
        .add(1, 'month')
        .valueOf()
    })
  }

  @bind
  private handleClick (item: Item) {
    const { value, isDisabled } = item

    if (isDisabled) return

    this.setState({
      selectedDate: value,
      generateDate: getGenerateDate(value)
    })

    if (_isFunction(this.props.onClick)) {
      this.props.onClick(item)
    }
  }

  @bind
  private handleLongClick (item: Item) {
    if (_isFunction(this.props.onLongClick)) {
      this.props.onLongClick(item)
    }
  }

  render () {
    const { generateDate, selectedDate } = this.state
    const { format, minDate, maxDate, marks, isSlider } = this
      .props as PropsWithDefaults

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
            marks={marks}
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            isSlider={isSlider}
            onClick={this.handleClick}
            onPreMonth={this.handleClickPre}
            onNextMonth={this.handleClickNext}
            onLongClick={this.handleLongClick}
            selectedDate={selectedDate}
            generateDate={generateDate}
          />
        </View>
      </View>
    )
  }
}
