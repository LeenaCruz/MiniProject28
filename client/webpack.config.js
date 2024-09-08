const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // TODO: Add the correct plugins
    plugins: [
     new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Contact Directory'
     }), 
     new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    }), 
    
     new WebpackPwaManifest({
      name: 'My Contact Directory', 
      short_name: 'MyContDir',
      description: 'My Awesome Contact Directory',
      background_color: '#800080',
      publicPath: './',
      icons:[
        {src: path.resolve('assets/images/logo.png'),
          size: [96,128,192,256,384,512],
          destination: path.join('assets', 'icon')
        },
      ]

     })
    ],

    // TODO: Add the correct modules
    module: {
rules: [ 
  {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
},
{
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
    },
  },
},
],
    },
  };
};
