const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    saved: './src/savedArticles/saved.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
      },

      {
        test: /\.(woff|woff2|ttf|)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]&esModule=false',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,

            },
          },
        ],
      }
    ]
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/savedArticles/saved.html',
      filename: 'saved.html',
      chunks: ['saved']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/main-page.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}