/**
 * lazyCompilation异步引用模块的按需编译
 * @param {*} options
 * @returns
 */
export const useLazyCompilation = (config) => {
  config.experiments = {
    lazyCompilation: true
  }
}
