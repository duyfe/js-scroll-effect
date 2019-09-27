const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      '@babel/polyfill',
      path.resolve(__dirname, 'src/js/index.js'),
      path.resolve(__dirname, 'src/css/js-scroll-effect.css'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js-scroll-effect.min.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
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
    new ExtractTextPlugin('js-scroll-effect.css'),
  ],
};
