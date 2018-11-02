import bind from 'bind-decorator'
import classnames from 'classnames'
import _isFunction from 'lodash/isFunction'

import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import * as constant from '../../common/constant'

import './index.scss'

export interface Props {
  groupData: Group<Item>

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
    const { groupData } = this.props

    if (!groupData || groupData.length === 0) return null

    return (
      <View className='group__flex'>
        {groupData.map((row, rowIndex) => (
          <View
            key={rowIndex}
            onClick={this.handleClick.bind(this, row)}
            onLongClick={this.handleLongClick.bind(this, row)}
            className={classnames('group__flex-item item', {
              'group__flex-item--today': row.isToday,
              'group__flex-item--active': row.isActive,
              'group__flex-item--blur':
                row.isDisabled ||
                row.type === constant.TYPE_PRE_MONTH ||
                row.type === constant.TYPE_NEXT_MONTH
            })}
          >
            <View className='item__container'>
              <View className='item__container-text'>{row.text}</View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

// {col.marks && col.marks.length > 0 ? (
//   <View className='item__extra-marks'>
//     {col.marks.map((mark, key) => (
//       <Text key={key} className='mark' />
//     ))}
//   </View>
// ) : null}

// {row.map((col, colIndex) => (
//   <View
//     key={colIndex}
//     onClick={this.handleClick.bind(this, col)}
//     onLongClick={this.handleLongClick.bind(this, col)}
//     className={classnames('group__flex-item item', {
//       'group__flex-item--today': col.isToday,
//       'group__flex-item--active': col.isActive,
//       'group__flex-item--blur':
//         col.isDisabled ||
//         col.type === constant.TYPE_PRE_MONTH ||
//         col.type === constant.TYPE_NEXT_MONTH
//     })}
//   >
//     <View className='item__container'>
//       <View className='item__container-text'>{col.text}</View>
//     </View>

//   </View>
// ))}
