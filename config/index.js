/* eslint-disable import/no-commonjs */
const config = {
  projectName: 'taro-calendar',
  date: '2018-10-23',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        url: {
          enable: true,
          limit: 10240
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    },
    devServer: {
      host: '0.0.0.0',
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
