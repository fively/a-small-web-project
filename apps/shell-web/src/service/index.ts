import { request } from '@/utils'

/**
 * 加载功能权限
 * @returns
 */
export const getFunctions = (): Promise<any> => {
  return request.get('/auth/functions')
}

/**
 * 用户登录
 * @param param0
 * @returns
 */
export const postLogin = ({ account, password }: { account: string; password: string }) => {
  return request.post('/auth/login', { account, password })
}

/**
 * 登出
 * @returns
 */
export const postLogout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

/**
 * 获取授权key
 * @returns
 */
export const getPublicKey = () => {
  return request.get('/auth/public-key')
}
