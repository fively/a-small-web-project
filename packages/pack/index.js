import { useLoader } from './lib/loader.js'
import { usePlugin } from './lib/plugin.js'
import { useNoParse } from './lib/noParse.js'
import { useLazyCompilation } from './lib/lazyCompilation.js'
import { useFederation } from './lib/federation.js'
import { useOptimization } from './lib/optimization.js'
import { useCache } from './lib/cache.js'
import { useDevServer } from './lib/devServer.js'

/**
 * 构建器
 * @param {*} options
 */
export const builder = (options) => {
  let config = {
    entry: options.entry,
    output: options.output,
    mode: options.mode || 'production',
    devtool: options.devtool ? options.devtool : false,
    resolve: options.resolve,
    module: {
      rules: []
    },
    plugins: []
  }

  // cache
  useCache(config)

  // 加载loader
  useLoader(config, options)

  // 加载plugin
  usePlugin(config, options)

  // noParse
  useNoParse(config)

  // 优化
  useOptimization(config)

  // 按需编译
  useLazyCompilation(config)

  // 处理模块联邦
  useFederation(config, options)

  // 开启devserver
  useDevServer(config, options)

  return config
}
