import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import {
  handleNetworkError,
  handleGeneralError,
  getAuthToken,
  removeAuthToken
} from './tool'

export const api = {
  name: 'Api',
  create: (options: any) => {
    /**
     * 创建请求实例
     */
    const request: AxiosInstance = axios.create(options)
    /**
     * 请求拦截
     */
    request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 设置请求头
      if (!config.headers) {
        config.headers = {} as AxiosHeaders
      }
      config.headers.Authorization = `Bearer ${getAuthToken()}`

      return config
    })

    /**
     * 响应拦截
     */
    request.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        const { errorcode = 0 } = data
        if (errorcode > 0) {
          handleGeneralError(errorcode, data.message)
          return Promise.reject(data)
        }

        return data
      },
      (error: any) => {
        console.log('response error:', error)
        handleNetworkError(error.response.status)
        if (error.response.status === 401) {
          removeAuthToken()
          window.location.replace('/login')
        }
        return Promise.reject(error.response.data)
      }
    )

    return request
  }
}
