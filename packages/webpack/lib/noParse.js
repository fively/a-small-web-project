/**
 * 使用noparse
 * @param {*} options
 * @returns
 */
export const useNoParse = (config) => {
  config.module.noParse = /(^react$)|(^react-dom$)/
}
