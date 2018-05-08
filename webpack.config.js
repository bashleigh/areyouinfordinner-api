const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Md5Hash = require('webpack-md5-hash');

module.exports = {
  entry: {
    'index.css': [
      './assets/sass/index.scss',
    ],
    // 'index.js': [
    //   'babel-polyfill',
    //   './assets/js/index.js',
    // ],
  },
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: '[chunkhash].[name]',
    chunkFilename: '[chunkhash].[name]',
    library: 'areyuoinfordinner',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg|jpg|jpeg)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'resolve-url-loader',
            },
          ]
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: '[chunkhash].[name]', allChunks: false}),
    new Md5Hash(),
    new ManifestPlugin({
      stripSrc: new RegExp('(.css|.js)'),
    }),
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'public', 'build'),
    ], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['manifest.json'],
    }),
    new CompressionPlugin(),
  ],
};
