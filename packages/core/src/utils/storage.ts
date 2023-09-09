/**
 * 本地存储
 */
export const storage = {
  /**
   * 设置
   * @param key
   * @param value
   */
  set: (key: string, value: string) => {
    window.localStorage.setItem(key, value)
  },
  /**
   * 获取
   * @param key
   * @returns
   */
  get: (key: string) => {
    return window.localStorage.getItem(key)
  },
  /**
   * 删除
   * @param key
   */
  remove: (key: string) => {
    window.localStorage.removeItem(key)
  }
}
