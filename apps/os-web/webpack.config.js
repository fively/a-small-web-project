import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'url'
import { builder } from '@sportback/pack'

export default () => {
  // 获取当前环境
  const _nodeEnv = process.env.NODE_ENV || 'development'
  const _PORT = process.env.PORT || 3001
  const isProduction = _nodeEnv === 'production'

  // 获取当前目录
  const __dirname = dirname(fileURLToPath(import.meta.url))

  // 输出信息
  let output = {}

  if (isProduction) {
    // 生产环境输出
    output = {
      clean: true,
      filename: 'js/[name].[contenthash:8].js',
      path: resolve(__dirname, `../../dist/${basename(__dirname)}`),
      publicPath: 'auto'
    }
  } else {
    // 非生产环境输出
    output = {
      clean: true,
      filename: 'js/[name].js',
      path: resolve(__dirname, './dist'),
      publicPath: `http://localhost:${_PORT}/`
    }
  }

  const config = builder({
    mode: _nodeEnv,
    entry: './src/index.tsx',
    output,
    env: {
      path: resolve(__dirname, `./.env${!isProduction ? `.${_nodeEnv}` : ''}`) // env 文件地址
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
      mainFiles: ['index']
    },
    devServer: {
      port: _PORT
    },
    bundleAnalyzer: !!process.env.BUNDLE_ANALYZER,
    federation: {
      mode: 'child', // 应用模式：main-主应用， child-子应用
      name: 'osApp', // 应用名称
      filename: 'osAppEntry.js', // 应用入口
      exposes: {
        './osRoutes': './src/routes/index.tsx' // 导出模块
      },
      shared: {
        // 共享模块
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
        antd: { singleton: true }
      }
    }
  })

  return config
}
