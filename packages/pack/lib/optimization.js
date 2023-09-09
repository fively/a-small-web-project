import TerserPlugin from 'terser-webpack-plugin'
/**
 * 处理构建优化
 * @param {*} config
 * @param {*} options
 */
export const useOptimization = (config, options) => {
  const { mode = 'production' } = config

  if (mode === 'production') {
    config.optimization = {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          terserOptions: {}
        })
      ]
    }
  } else {
    config.optimization = {
      removeAvailableModules: false,
      removeEmptyChunks: false, // 删除空chunk
      splitChunks: false, // 代码分包
      minimize: false, // 代码压缩
      concatenateModules: false,
      usedExports: false // treeshaking
    }
  }
}
