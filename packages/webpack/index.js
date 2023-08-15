/**
 * 构建入口
 * @param options
 * @returns
 */
module.exports = (options) => {
  const { mode = 'development' } = options

  if (mode === 'development') {
    return require('./development')(options)
  } else if (mode === 'production') {
    return require('./production')(options)
  } else {
    throw new Error('mode目前只支持development或production')
  }
}
