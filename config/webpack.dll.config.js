const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'moment',
      'axios',
      'antd',
      'echarts',
      'dva'
    ]
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name]_dll.js',
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, '../public/manifest.json'),
    })
  ]
};