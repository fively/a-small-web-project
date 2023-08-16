import webpack from 'webpack'
import dotenv from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import BundleAnalyzer from 'webpack-bundle-analyzer'
import CompressionPlugin from 'compression-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin/index.js'

const BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin
/**
 * 添加插件
 * @param {*} config
 * @param {*} options
 */
export const usePlugin = (config, options) => {
  // html文件模版
  config.plugins.push(
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
    })
  )

  // 命令行界面仪表盘
  config.plugins.push(new DashboardPlugin())

  // fork 出子进程，专门用于执行类型检查
  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  // process.env
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  )

  const { env = {}, mode = 'development', bundleAnalyzer = false } = options
  // 写入环境变量数据
  if (env && env.path) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(
          dotenv.config({
            path: env.path
          }).parsed
        )
      })
    )
  }

  // 生产环境增加插件
  if (mode === 'production') {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash:8].css'
      })
    )

    config.plugins.push(
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

    config.plugins.push(
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
    if (bundleAnalyzer) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }

  // 添加传入的插件
  if (Array.isArray(options.plugins)) {
    config.plugins.push(...options.plugins)
  }
}
