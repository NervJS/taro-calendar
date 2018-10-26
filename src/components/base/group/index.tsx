/// <reference path='../../types.d.ts' />

import classnames from 'classnames'

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export interface Props {
  onClick: (item: Calendar.Body.Item) => void

  onLongClick: (item: Calendar.Body.Item) => void

  groupData?: Calendar.Body.Group<Calendar.Body.Item>
}

export default class AtCalendarGroup extends Taro.Component<Props> {
  render () {
    const { groupData } = this.props

    if (!Array.isArray(groupData)) return null

    return (
      <View className='at-calendar__group group'>
        {groupData.map((row, rowIndex) => (
          <View key={rowIndex} className='group__flex'>
            {row.map((col, colIndex) => (
              <View
                key={colIndex}
                onClick={this.props.onClick.bind(this, col)}
                onLongClick={this.props.onLongClick.bind(this, col)}
                className={classnames('group__flex-item item', {
                  'group__flex-item--active': col.isActive,
                  'group__flex-item--disabled': col.isDisabled
                })}
              >
                <View className='item__container'>
                  <View className='item__container-text'>{col.text}</View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}
