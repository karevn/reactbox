var autoprefixer = require('autoprefixer')
module.exports = {
  output: {
    filename: "./dist/reactbox.js"
  },
  entry: ["./index"],
  module: {
    loaders: [
      { test: /\.coffee$/, loaders: ["coffee-loader"] },
      { test: /\.sass$/, loaders: ["style", "css", "postcss", "sass?indentedSyntax"]},
      { test: /\.cjsx$/, loaders: ["coffee", 'cjsx']},
      { test: /\.jsx?$/, loaders: ["babel"]},
      { test: /\.css$/, loaders: ["style", "css"]},
      { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url' },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'url' }
    ]
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".coffee", ".cjsx", ".jsx", ".js"],
    /*alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'react-addons-css-transition-group': 'rc-css-transition-group'
        },*/
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}
