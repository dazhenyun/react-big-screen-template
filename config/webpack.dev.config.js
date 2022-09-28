const webpackMerge = require('webpack-merge');
const comConfig = require('./webpack.basic.config');
const webpack = require('webpack');

module.exports = webpackMerge.merge(
  comConfig,
  {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin(), // 热更新插件
    ],
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      index: './local.html',
      contentBase: './build',
      progress: false,
      port: 9095,
      proxy: {
        '/api': {
          // target: "http://10.1.100.8:7003",
          secure: false, // 接受 运行在 https 上的服务
        },
      },
    }
  }
);