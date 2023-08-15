const yaml = require('yaml')
const json5 = require('json5')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * 创建loader规则
 * @param mode
 */
module.exports = (mode = 'development') => {
  return [
    {
      test: /\.tsx?$/, // 解析ts、tsx
      exclude: /node_modules\/(?!(?:@sportback)\/).*/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            // 设置为“仅编译”，关闭类型检查
            transpileOnly: true
          }
        }
      ]
    },
    {
      test: /\.jsx?$/, // 解析js、jsx
      exclude: /node_modules\/(?!(?:@sportback)\/).*/,
      use: ['babel-loader']
    },
    {
      test: /\.css$/,
      use: [
        mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(png|jpe?g)$/,
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
      type: 'asset/resource'
    },
    {
      test: /\.(csv|tsv)$/i,
      use: ['csv-loader']
    },
    {
      test: /\.xml$/i,
      use: ['xml-loader']
    },
    {
      test: /\.json5$/i,
      type: 'json',
      parser: {
        parse: json5.parse
      }
    },
    {
      test: /\.yaml$/i,
      type: 'json',
      parser: {
        parse: yaml.parse
      }
    }
  ]
}
