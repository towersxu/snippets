/**
 * webpack配置，多个输入，多个输出
 */
let path = require('path')
// webpack打包内容分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function assetsPath(_path) {
  return path.posix.join('static', _path)
}

module.exports = {
  mode: 'production',
  entry: {
    // 配置两个入口文件。将输出form-ctor.min.js和form-viewer.min.js
    'form-ctor': ['./src/index.js'],
    'form-viewer': ['./src/viewer/viewer.js']
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].min.js', // 将输出form-ctor.min.js和form-viewer.min.js
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        include: path.resolve('node_modules', 'lodash-es'),
        sideEffects: false
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
