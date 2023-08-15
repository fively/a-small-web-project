const { resolve, join } = require('node:path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const createRules = require('./lib/rules')
const createPlugin = require('./lib/plugin')
const createFederation = require('./lib/federation')

const smp = new SpeedMeasurePlugin()

/**
 *
 * @param options
 * @returns
 */
module.exports = (options) => {
  const {
    entry,
    output,
    envParsed,
    federation,
    plugins = [],
    rules = [],
    devServer,
    mode = 'production'
  } = options

  // 插件
  const _plugins = createPlugin({
    mode,
    envParsed
  })

  if (federation) {
    _plugins.push(createFederation(federation))
  }

  // loader解析器
  const _rules = createRules(mode)

  return smp.wrap({
    mode: 'production',
    entry,
    output,
    module: {
      rules: [..._rules, ...rules]
    },
    plugins: [..._plugins, ...plugins],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src')
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
      mainFiles: ['index']
    },
    optimization: {
      usedExports: true,
      minimizer: [new CssMinimizerPlugin()]
    }
  })
}
