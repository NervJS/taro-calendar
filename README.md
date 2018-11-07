# Taro 日历组件  🎉  🗓

[![NPM][npm-version-image]][npm-version-url] [![david-dm][david-dm-image]][david-dm-url]

一款基于 `Taro` 框架开发的多端日历组件

## 关于 Taro

Taro 是由 [凹凸实验室](https://aotu.io) 倾力打造的多端开发解决方案。现如今市面上端的形态多种多样，Web、ReactNative、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、RN 等）运行的代码。

## 体验

请使用微信扫一扫以下体验码

![QRCode](./static/wxapp.jpg)

## 安装

```bash
# npm
npm install taro-calendar --save

# yarn
yarn add taro-calendar
```

## API

| name             | type                                         | default      | description                  |
| ---------------- | -------------------------------------------- | ------------ | ---------------------------- |
| currentDate      | `string \| number \| Date`                   | `Date.now()` | 当前的时间                   |
| minDate          | `string \| number \| Date`                   | -            | 最小的可选时间               |
| maxDate          | `string \| number \| Date`                   | -            | 最大的可选时间               |
| isSwiper         | `boolean`                                    | `true`       | 是否可以滑动                 |
| marks            | `Array<{ value: string \| number \| Date }>` | `[]`         | 需要标记的时间               |
| format           | `string`                                     | `YYYY-MM-DD` | 日期格式                     |
| monthFormat      | `string`                                     | `YYYY年MM月` | 月份格式                     |
| hideArrow        | `boolean`                                    | `false`      | 是否隐藏箭头                 |
| isVertical       | `boolean`                                    | `false`      | 是否垂直滑动                 |
| onClickPreMonth  | `() => void`                                 | -            | 点击箭头去上一个月的时候触发 |
| onClickNextMonth | `() => void`                                 | -            | 点击箭头去下一个月的时候触发 |
| onDayClick       | `(item: Item) => void`                       | -            | 点击日期时候触发             |
| onDayLongClick   | `(item: Item) => void`                       | -            | 长安日期时触发               |
| onMonthChange    | `(value: string) => void`                    | -            | 月份改变时触发               |

## 开发交流

暂无讨论群，有需要问题的请在提交 `Issue` 或者加入 [Taro UI 官方微信交流群](https://github.com/NervJS/taro-ui/issues/16)

## 开发计划

- [ ] 范围选择
- [ ] 缓存优化
- [ ] H5 与小程序一致性
- [ ] 支付宝、百度等小程序支持
- [ ] 跨月份选择抖动
- [ ] i18n 支持

## 贡献

如果你有兴趣成为 `Taro Calendar` 的一名贡献者欢迎提交 `Pull Request`。在提交之前，请遵循 `eslint` 和 `commit-lint`

## 相关链接

- [Taro](https://taro.aotu.io/)

[npm-version-image]: https://img.shields.io/npm/v/taro-calendar.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/taro-calendar
[david-dm-image]: https://david-dm.org/NervJS/taro-calendar.svg?style=flat-square
[david-dm-url]: https://david-dm.org/NervJS/taro-calendar
