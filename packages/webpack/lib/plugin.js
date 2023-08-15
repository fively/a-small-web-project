const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * 生成插件
 * @param mode
 * @returns
 */
module.exports = (options) => {
  const { mode = 'development', env } = options

  const plugins = [
    new DashboardPlugin(),
    // fork 出子进程，专门用于执行类型检查
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      cache: false,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      }
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]

  // 是否引入env文件
  if (env && env.path) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(
          dotenv.config({
            path: env.path
          }).parsed
        )
      })
    )
  }

  if (mode === 'production') {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const BundleAnalyzerPlugin =
      require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    const CompressionPlugin = require('compression-webpack-plugin')

    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash].css'
      })
    )
    plugins.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        extractComments: true // 注释提取到单独的文件中
      })
    )

    plugins.push(
      new CompressionPlugin({
        test: /.(js|css)$/, // 只生成css,js压缩文件
        filename: '[path][base].gz', // 文件命名
        algorithm: 'gzip', // 压缩格式,默认是gzip
        test: /.(js|css)$/, // 只生成css,js压缩文件
        threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
        minRatio: 0.8 // 压缩率,默认值是 0.8
      })
    )

    // 打包后展示分析页面
    if (process.env.BUNDLE_ANALYZER) {
      plugins.push(new BundleAnalyzerPlugin())
    }
  }

  return plugins
}
