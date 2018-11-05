import bind from 'bind-decorator'
import classnames from 'classnames'
import _isFunction from 'lodash/isFunction'

import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import * as constant from '../../common/constant'

import './index.scss'

export interface Props {
  list: List<Item>

  onClick?: (item: Item) => void

  onLongClick?: (item: Item) => void
}

export default class AtCalendarGroup extends Taro.Component<Props> {
  @bind
  private handleClick (item) {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(item)
    }
  }

  @bind
  private handleLongClick (item) {
    if (_isFunction(this.props.onLongClick)) {
      this.props.onLongClick(item)
    }
  }

  render () {
    const { list } = this.props

    if (!list || list.length === 0) return null

    return (
      <View className='at-calendar__list'>
        <View className='flex'>
          {list.map((item, index) => (
            <View
              key={index}
              onClick={this.handleClick.bind(this, item)}
              onLongClick={this.handleLongClick.bind(this, item)}
              className={classnames('flex__item', {
                'flex__item--today': item.isToday,
                'flex__item--active': item.isActive,
                'flex__item--blur':
                  item.isDisabled ||
                  item.type === constant.TYPE_PRE_MONTH ||
                  item.type === constant.TYPE_NEXT_MONTH
              })}
            >
              <View className='flex__item-container'>
                <View className='container-text'>{item.text}</View>
              </View>
              <View className='flex__item-extra extra'>
                {item.marks && item.marks.length > 0 ? (
                  <View className='extra-marks'>
                    {item.marks.map((mark, key) => (
                      <Text key={key} className='mark' />
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
