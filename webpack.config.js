var ExtractTextPlugin = require("extract-text-webpack-plugin");
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');

module.exports = {
  entry: "./frontend/core.js",
  output: {
    path: "./public/js/",
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader!sass")
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("../stylesheets/[name].css")
  ]
};
