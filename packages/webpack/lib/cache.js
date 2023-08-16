/**
 * webpack缓存
 * @param {*} config
 */
export const useCache = (config) => {
  if (config.mode === 'production') return

  config.cache = {
    type: 'filesystem'
  }
}
