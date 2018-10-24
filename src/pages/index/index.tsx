import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

import AtCalendar from '../../components/index'

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
          <AtCalendar title='Hello World' />
        </View>
      </View>
    )
  }
}
