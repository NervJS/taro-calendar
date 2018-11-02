import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

import AtCalendar from '../../components/calendar/index'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'Taro日历组件展示'
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View className='main-page'>
        <View className='main-page__header'>
          <Text className='header-title'>Taro 日历组件</Text>
        </View>
        <View className='main-page__body'>
          <View className='example'>
            <AtCalendar
              minDate='2018/8/20'
              maxDate='2018/11/11'
              marks={[{ value: '2018/10/31' }]}
            />
          </View>

          <View className='example'>
            <AtCalendar
              isSlider
              minDate='2018/8/20'
              maxDate='2018/11/11'
              marks={[{ value: '2018/10/31' }]}
            />
          </View>
        </View>
      </View>
    )
  }
}
