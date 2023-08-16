import { parse as yamlParse } from 'yaml'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import json5 from 'json5'
const { parse: json5Parse } = json5

/**
 * 添加loader规则
 * @param {*} config
 * @param {*} options 传入自定义参数
 */
export const useLoader = (config, options) => {
  const { mode = 'production' } = config

  // 生产和开发环境，使用不同loader
  let styleLoader = {
    loader: 'style-loader',
    options: {
      esModule: true
    }
  }
  if (mode === 'production') {
    styleLoader = {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: true
      }
    }
  }

  config.module.rules = [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules\/(?!(?:@sportback)\/).*/,
      loader: 'esbuild-loader',
      options: {
        target: 'es2015',
      }
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [styleLoader, 'css-loader', 'postcss-loader']
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [styleLoader, 'css-loader', 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g)$/,
      exclude: /node_modules/,
      type: 'asset',
      generator: {
        filename: 'images/[contenthash:8][ext][query]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 4 * 1024
        }
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      exclude: /node_modules/,
      type: 'asset/resource'
    },
    {
      test: /\.(csv|tsv)$/i,
      exclude: /node_modules/,
      use: ['csv-loader']
    },
    {
      test: /\.xml$/i,
      exclude: /node_modules/,
      use: ['xml-loader']
    },
    {
      test: /\.json5$/i,
      exclude: /node_modules/,
      type: 'json',
      parser: {
        parse: json5Parse
      }
    },
    {
      test: /\.yaml$/i,
      exclude: /node_modules/,
      type: 'json',
      parser: {
        parse: yamlParse
      }
    }
  ]

  // 传入的规则
  const { module = {} } = options
  if (module && Array.isArray(module.rules)) {
    config.module.rules.push(...module.rules)
  }
}
