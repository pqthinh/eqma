const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const publicPath = '/'

module.exports = webpackMerge.smart(baseConfig, {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: publicPath
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_API_URL: JSON.stringify('https://wemarket-api.herokuapp.com/api/'),
        NODE_ENV: JSON.stringify('production'),
        ENCRYPTION_KEY: JSON.stringify('qltb'),
        LOCAL_STORAGE_KEY: JSON.stringify('qltb'),
        SECRET_TOKEN_KEY: JSON.stringify('SECRET_TOKEN_KEY'),
        SECRET_USER_KEY: JSON.stringify('SECRET_USER_KEY'),
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
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        configuration: {
          minimize: {
            compress: { warnings: false }
          }
        }
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
})
