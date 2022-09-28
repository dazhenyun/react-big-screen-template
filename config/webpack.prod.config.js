const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除之前打包的冗余文件
const webpackMerge = require('webpack-merge');
const comConfig = require('./webpack.basic.config');

module.exports = webpackMerge.merge(
  comConfig,
  {
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production') // 定义编译环境。 process.argv：当前进程的命令行参数数组。process.env：指向当前shell的环境变量，比如process.env.HOME。
        }
      }),
    ],
    
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     cacheGroups: {
    //       ventor: {
    //         name: 'ventor',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: 10,
    //         chunks: 'initial' // 只打包初始时依赖的第三方
    //       },

    //     }
    //   },
    //   runtimeChunk: true,
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       test: /\.js(\?.*)?$/i,  //匹配文件,
    //       chunkFilter: (chunk) => {
    //         if (chunk.name === 'vendor') { // `vendor` 模块不压缩
    //           return false;
    //         }
    //         return true;
    //       },
    //       cache: true,
    //       parallel: true,  //使用多进程并行运行来提高构建速度
    //     }),
    //   ]
    // }
  }
);