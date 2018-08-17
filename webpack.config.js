const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const fs = require('fs')

const content = {
  de: require("./src/content/de.json"),
  en: require("./src/content/en.json")
}

const pages = fs.readdirSync('./src/pages/')

const getHtmlPluginConfig = (pageName, lang) => {
  return new HtmlWebpackPlugin({
    filename: `${pageName.replace(/\.[^/.]+$/, "")}.html`,
    templateParameters: {
      username: 'test',
      lang: lang,
      ...content[lang],
    },
    template: path.join(__dirname, `src/pages/${pageName}`)
  })
}

const htmlPagesConfig = pages.map(page => {
  return getHtmlPluginConfig(page)
})

module.exports = {
  entry: path.join(__dirname, 'src/app.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
	module: {
		rules: [
      {
        include: path.join(__dirname, 'src'),
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
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
        use: [
          'file-loader',
        ],
      }
    ]
	},
  plugins: [
    ...htmlPagesConfig,
    new MiniCssExtractPlugin({
      path: path.join(__dirname, 'dist'),
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
