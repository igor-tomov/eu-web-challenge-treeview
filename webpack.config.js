var webpack = require('webpack');



module.exports = {

  entry: {
    vendors: [
      'jquery',
      'backbone',
      'svg.js'
    ],

    app: __dirname + '/app'
  },

  output: {
    path: __dirname + '/public/js/dist/',
    filename: "[name].bundle.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin( "vendors", "vendors.bundle.js" ),
  ]
};