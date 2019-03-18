/**
 * 使用css-loader开启css module的时候，
 * 如果想要某些css文件不经过css module
 * 可以配置成两个。
 * import "global.css?raw"
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        oneOf: [{
          resourceQuery: /^\?raw$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader')
          ]
        }, {
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]_[sha1:hash:hex:4]'
            }
          }]
        }]
      }
    ]
  }
}