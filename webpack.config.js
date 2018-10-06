const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: path.join(__dirname, 'src/app.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.join(__dirname, 'dist'),
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
