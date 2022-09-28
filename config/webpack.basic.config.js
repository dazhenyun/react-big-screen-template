/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');   // webpack静态资源输出
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';


const lessInclude = [
  path.resolve('./', 'src/assets'),
  path.resolve('./', 'src/components')
];

const LessCommonSet = [{
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,

  }
},
{
  loader: 'style-resources-loader',
  options: {
    patterns: path.resolve('./', 'src/assets/less/color.less')
  }
}];

module.exports = {
  entry: {
    bundle: [path.resolve('./', 'src/main.js')]
  },
  output: {
    path: path.resolve('./', './dist'),
    filename: devMode ? './[name].app.js' : './js/[name].[chunkhash:4].js',
    chunkFilename: devMode ? '[name].app.js' : './js/[name].[chunkhash:4].js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve('./', 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: lessInclude,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]', // 配置css module
              }
            }
          },
          ...LessCommonSet
        ]
      },
      {
        test: /\.less$/,
        include: lessInclude,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          ...LessCommonSet
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '8192',
          publicPath: '../images/',
          outputPath: './images/'
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: [ '.jsx','.js', '.less'],
    // 路径别名
    alias: {
      '@': path.resolve('./', 'src'),
    }
  },
  // 插件，用于生产模版和各项功能
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? './style/[name].css' : './style/[name].[hash].css',
      chunkFilename: devMode ? './style/[id].css' : './style/[id].[hash].css',
    }),
    new CopyWebpackPlugin([{
      from: path.resolve('./', 'public'),
      to: path.resolve('./', 'build/public'),
      ignore: ['.*']
    }]),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)(\?.*)?$/i
    }),
	  new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve('./', 'public/manifest.json')
    }),
    new HTMLPlugin({
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格
      },
      template: './index.html',  // 模板
      inject: true, // inject有四个值： true body head false
      hash: true, // 是否添加hash值
    }), // 处理html模版  
    new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../public/vendor_dll.js') })
  ],
};