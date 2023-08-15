const { resolve, join } = require('node:path')

const createRules = require('./lib/rules')
const createPlugin = require('./lib/plugin')
const createFederation = require('./lib/federation')

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
    mode = 'development'
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

  return {
    mode: 'development',
    entry,
    output,
    devtool: 'eval',
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [join(__dirname, './.babelrc')]
      }
    },
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
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      minimize: false,
      concatenateModules: false,
      usedExports: false
    },
    devServer: {
      port: 3001,
      https: false,
      hot: true,
      liveReload: true,
      client: {
        overlay: false
      },
      historyApiFallback: true,
      ...devServer
    }
  }
}
