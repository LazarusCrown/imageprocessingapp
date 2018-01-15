const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    alias: {
      'parent-scope-loader': path.join(_dirname, 'webpack', 'optimization-loader.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },

  //      //testing for wrapping client side functionality...  
  //     {
  //       test: /\.js$/,
  //       use: [
  //         {loader: 'optimization-loader',
  //          options: {/*...*/}
  //         }
  //       ],
  //     },
  
       ]
      },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'workers/serviceWorker.js'),
      filename: 'serviceWorker.js',
    }),
  ],
};
