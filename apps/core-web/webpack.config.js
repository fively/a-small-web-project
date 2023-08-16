import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'url'
import { builder } from '@sportback/webpack'

export default () => {
  // 获取当前环境
  const _nodeEnv = process.env.NODE_ENV || 'development'

  // 获取当前目录
  const __dirname = dirname(fileURLToPath(import.meta.url))

  // 输出信息
  let output = {}

  switch (_nodeEnv) {
    // 生产环境输出
    case 'production':
      output = {
        clean: true,
        filename: 'js/[name].[contenthash:8].js',
        path: resolve(__dirname, `../../dist/${basename(__dirname)}`),
        publicPath: 'auto'
      }
      break
    default:
      // 非生产环境输出
      output = {
        clean: true,
        filename: 'js/[name].js',
        path: resolve(__dirname, './dist'),
        publicPath: 'http://localhost:3001/'
      }
      break
  }

  const config = builder({
    mode: _nodeEnv,
    entry: './src/index.tsx',
    output,
    env: {
      path: resolve(__dirname, `./.env.${_nodeEnv}`) // env 文件地址
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, '../src')
      },
      extensions: ['.tsx', '.ts', '.js', '.json'],
      mainFiles: ['index']
    }
    // federation: {
    //   mode: 'main', // 应用模式：main-主应用， child-子应用
    //   name: 'coreApp', // 应用名称
    //   filename: 'coreAppEntry.js', // 应用入口
    //   exposes: {
    //     //  导出模块
    //     './coreRoutes': './src/routes/index.tsx'
    //   },
    //   shared: {
    //     // 共享模块
    //     react: { singleton: true },
    //     'react-dom': { singleton: true },
    //     'react-router-dom': { singleton: true }
    //   }
    // }
  })

  console.log('config:', config)

  return config
}
