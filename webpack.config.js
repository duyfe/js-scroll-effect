const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/js/index.js'),
      path.resolve(__dirname, 'src/css/scroll-effect.css'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scroll-effect.js',
  },
  devtool: isProd?'':'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    watchContentBase: true,
    contentBase: [path.resolve(__dirname, 'dist')],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin('scroll-effect.css'),
  ],
};
