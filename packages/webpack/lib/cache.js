/**
 * webpack缓存
 * @param {*} config 
 */
export const useCache = (config) => {
  config.cache = {
    type: 'filesystem'
  }
}
