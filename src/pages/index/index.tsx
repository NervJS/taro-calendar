import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import bind from 'bind-decorator'

import './index.scss'

import AtCalendar from '../../components/calendar/index'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'Taro日历组件展示'
  }

  state = {
    now: Date.now()
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  @bind
  handleClick () {
    this.setState({
      now: '2018/01/01'
    })
  }

  @bind
  handleDayClick (...arg) {
    console.log('handleDayClick', arg)
  }

  @bind
  handleDayLongClick (...arg) {
    console.log('handleDayLongClick', arg)
  }

  @bind
  handleDateChange (...arg) {
    console.log('handleDateChange', arg)
  }

  render () {
    return (
      <View className='main-page'>
        <View className='main-page__header'>
          <Text className='header-title'>Taro 日历组件</Text>
        </View>

        <View className='main-page__body'>
          <View className='example'>
            <Button size='mini' onClick={this.handleClick}>
              跳转到 2018/01/01
            </Button>
          </View>

          <View className='example'>
            <AtCalendar
              minDate='2018/8/20'
              maxDate='2018/11/11'
              currentDate={this.state.now}
              marks={[{ value: '2018/10/31' }]}
              onDayClick={this.handleDayClick}
              onMonthChange={this.handleDateChange}
              onDayLongClick={this.handleDayLongClick}
            />
          </View>

          <View className='example'>
            <AtCalendar isSlider marks={[{ value: '2018/10/31' }]} />
          </View>
        </View>
      </View>
    )
  }
}
