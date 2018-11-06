import dayjs, { Dayjs } from 'dayjs'
import bind from 'bind-decorator'
import _isFunction from 'lodash/isFunction'
import { BaseEvent } from '@tarojs/components/types/common'

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import AtCalendarBody from './body/index'
import { getGenerateDate } from '../common/helper'
import AtCalendarController from './controller/index'
import { DefaultProps, Props, State, PropsWithDefaults } from './interface'

import './index.scss'

const defaultProps: DefaultProps = {
  marks: [],
  isSlider: false,
  hideArrow: false,
  format: 'YYYY-MM-DD',
  currentDate: Date.now(),
  monthFormat: 'YYYY年MM月'
}

export default class AtCalendar extends Taro.Component<Props, State> {
  static defaultProps: DefaultProps = defaultProps

  readonly state: Readonly<State> = {
    selectedDate: dayjs(this.props.currentDate)
      .startOf('day')
      .valueOf(),
    generateDate: getGenerateDate(this.props.currentDate).valueOf()
  }

  componentWillReceiveProps (nextProps) {
    const { currentDate } = nextProps
    this.setState({
      selectedDate: dayjs(currentDate)
        .startOf('day')
        .valueOf(),
      generateDate: getGenerateDate(currentDate).valueOf()
    })
  }

  @bind
  private triggerChangeDate (value: Dayjs) {
    const { format } = this.props

    if (!_isFunction(this.props.onMonthChange)) return

    this.props.onMonthChange(value.format(format))
  }

  @bind
  private handleClickPreMonth (isMinMonth?: boolean): void {
    const { generateDate } = this.state

    if (isMinMonth === true) {
      return
    }

    const _generateDate: Dayjs = dayjs(generateDate).subtract(1, 'month')

    this.triggerChangeDate(_generateDate)
    this.setState({
      generateDate: _generateDate.valueOf()
    })

    if (_isFunction(this.props.onClickPreMonth)) {
      this.props.onClickPreMonth()
    }
  }

  @bind
  private handleClickNextMonth (isMaxMonth?: boolean): void {
    const { generateDate } = this.state

    if (isMaxMonth === true) {
      return
    }

    const _generateDate: Dayjs = dayjs(generateDate).add(1, 'month')

    this.triggerChangeDate(_generateDate)
    this.setState({
      generateDate: _generateDate.valueOf()
    })

    if (_isFunction(this.props.onClickNextMonth)) {
      this.props.onClickNextMonth()
    }
  }

  @bind
  private handleSelectDate (
    e: BaseEvent & { detail: { value: Array<string> } }
  ) {
    const { value } = e.detail

    const _generateDate: Dayjs = dayjs(value.join(''))
    const _generateDateValue: number = _generateDate.valueOf()

    if (this.state.generateDate === _generateDateValue) return

    this.triggerChangeDate(_generateDate)
    this.setState({
      generateDate: _generateDateValue
    })
  }

  @bind
  private handleClick (item: Item) {
    const { generateDate } = this.state
    const { isDisabled, _value } = item

    if (isDisabled) return

    const _state: Partial<State> = {
      selectedDate: _value.valueOf()
    }

    const _generateDate: Dayjs = _value.startOf('month')
    const _generateDateValue: number = _generateDate.valueOf()

    if (_generateDateValue !== generateDate) {
      this.triggerChangeDate(_generateDate)
      _state.generateDate = _generateDateValue
    }

    this.setState(_state as State)

    if (_isFunction(this.props.onDayClick)) {
      this.props.onDayClick(item)
    }
  }

  @bind
  private handleDayLongClick (item: Item) {
    if (_isFunction(this.props.onDayLongClick)) {
      this.props.onDayLongClick(item)
    }
  }

  render () {
    const { generateDate, selectedDate } = this.state
    const {
      marks,
      format,
      minDate,
      maxDate,
      isSlider,
      hideArrow,
      monthFormat
    } = this.props as PropsWithDefaults

    return (
      <View className='at-calender'>
        <View className='at-calender__controller'>
          <AtCalendarController
            minDate={minDate}
            maxDate={maxDate}
            hideArrow={hideArrow}
            monthFormat={monthFormat}
            generateDate={generateDate}
            onPreMonth={this.handleClickPreMonth}
            onNextMonth={this.handleClickNextMonth}
            onSelectDate={this.handleSelectDate}
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
            selectedDate={selectedDate}
            generateDate={generateDate}
            onLongClick={this.handleDayLongClick}
            onPreMonth={this.handleClickPreMonth}
            onNextMonth={this.handleClickNextMonth}
          />
        </View>
      </View>
    )
  }
}
