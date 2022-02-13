'use strict'

const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const publicPath = '/'
const path = require('path')
const webpack = require('webpack')

module.exports = webpackMerge.smart(baseConfig, {
  entry: [
    'regenerator-runtime/runtime',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: publicPath
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    port: 5000,
    historyApiFallback: true,
    stats: 'minimal'
  },
  watchOptions: {
    poll: 1000,
    ignored: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_API_URL: JSON.stringify('https://wemarket-api.herokuapp.com/api/'),
        NODE_ENV: JSON.stringify('development'),
        ENCRYPTION_KEY: JSON.stringify('marketplace'),
        LOCAL_STORAGE_KEY: JSON.stringify('marketplace'),
        SECRET_TOKEN_KEY: JSON.stringify('SECRET_TOKEN_KEY'),
        SECRET_USER_KEY: JSON.stringify('SECRET_USER_KEY'),
        RESET_PASSWORD_TOKEN_KEY: JSON.stringify('RESET_PASSWORD_TOKEN_KEY'),
        FIREBASE_CONFIG: JSON.stringify({
          apiKey: 'AIzaSyCNXYTZYWysW6kCkgA3MMqbA2z6Z7-C0Bg',
          authDomain: 'easychat-22849.firebaseapp.com',
          projectId: 'easychat-22849',
          storageBucket: 'easychat-22849.appspot.com',
          messagingSenderId: '213287869941',
          appId: '1:213287869941:web:0053d39d90cfaaced0d4bc',
          measurementId: 'G-TQ679S1022'
        }),
        FIREBASE_VAPID_KEY: JSON.stringify(
          'BGxnrMiF_q42yjQ7jM3sQ9-t94BwXPyhUl54PVKcz6kkG6T0nSibui0QMUFCodADLmYgCIpqjSrCxaCcBpBHiyE'
        )
      }
    })
  ]
})
