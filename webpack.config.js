var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        loader: ExtractTextPlugin.extract("css-loader!sass")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("../stylesheets/[name].css")
  ]
};
