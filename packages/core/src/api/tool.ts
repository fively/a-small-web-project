import { storage } from '../utils/storage'
import { message } from 'antd'
/**
 * 网络请求错误处理
 * @param errorStatus
 */
export const handleNetworkError = (errorStatus: number) => {
  let errMessage = '未知错误'
  if (errorStatus) {
    switch (errorStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errorStatus}`
    }
  } else {
    errMessage = `无法连接到服务器！`
  }

  message.error(errMessage)
}

/**
 * 处理业务逻辑错误提示
 * @param errno
 * @param errmsg
 * @returns
 */
export const handleGeneralError = (errno: number = 0, errmsg: string = '') => {
  if (errno !== 0) {
    const ErrorMap: any = {
      10031: '登录失效，需要重新登录', // token 失效
      10032: '您太久没登录，请重新登录~', // token 过期
      10033: '账户未绑定角色，请联系管理员绑定角色',
      10034: '该用户未注册，请联系管理员注册用户',
      10035: 'code 无法获取对应第三方平台用户',
      10036: '该账户未关联员工，请联系管理员做关联',
      10037: '账号已无效'
    }

    if (!errmsg) {
      message.error(ErrorMap[errno])
    } else {
      message.error(errmsg)
    }
    return false
  }

  return true
}

/**
 * 获取授权token
 * @returns
 */
export const getAuthToken = () => {
  return storage.get('__auth_token__') || ''
}

/**
 * 删除token
 * @returns
 */
export const removeAuthToken = () => {
  return storage.remove('__auth_token__')
}
