/**
 * lazyCompilation异步引用模块的按需编译
 * @param {*} options
 * @returns
 */
export const useLazyCompilation = (config) => {
  if (config.mode === 'production') return
  
  config.experiments = {
    lazyCompilation: true
  }
}
