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
  handleClick (value: string) {
    this.setState({
      now: value
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
  handleDateChange (arg) {
    console.log('handleDateChange', arg)
  }

  render () {
    const { now } = this.state
    return (
      <View className='main-page page'>
        <View className='page-header'>
          <Text className='page-header__title'>Taro 日历组件</Text>
        </View>

        <View className='main-page__body'>
          <View className='example'>
            <View className='example__title'>一般案例</View>
            <View className='example__body'>
              <AtCalendar />
            </View>
          </View>

          <View className='example'>
            <View className='example__title'>跳转到指定日期</View>
            <View className='example__body'>
              <AtCalendar currentDate={now} />
              <View className='body_controllers'>
                <Button
                  className='button'
                  size='mini'
                  onClick={this.handleClick.bind(this, '2018/01/01')}
                >
                  跳转到 2018/01/01
                </Button>
                <Button
                  className='button'
                  size='mini'
                  onClick={this.handleClick.bind(this, '2018/06/18')}
                >
                  跳转到 2018/6/18
                </Button>
              </View>
            </View>
          </View>

          <View className='example'>
            <View className='example__title'>指定最小日期和最大日期</View>
            <View className='example__body'>
              <AtCalendar minDate='2018/06/11' maxDate='2018/12/12' />
            </View>
          </View>

          <View className='example'>
            <View className='example__title'>标记时间</View>
            <View className='example__body'>
              <AtCalendar
                marks={[
                  {
                    value: '2018/11/11'
                  }
                ]}
              />
            </View>
          </View>

          <View className='example'>
            <View className='example__title'>禁止滑动</View>
            <View className='example__body'>
              <AtCalendar isSwiper={false} />
            </View>
          </View>

          <View className='example'>
            <View className='example__title'>垂直滑动</View>
            <View className='example__body'>
              <AtCalendar isVertical />
            </View>
          </View>

        </View>
      </View>
    )
  }
}
