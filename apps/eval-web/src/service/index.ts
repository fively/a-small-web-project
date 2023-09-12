import { request } from '@/utils'

/**
 * 创建问卷
 * @param data
 * @returns
 */
export const createQuestion = (data: any): Promise<any> => {
  return request.post(`/question/create`, data)
}

/**
 * 更新问卷
 * @param id
 * @param data
 * @returns
 */
export const updateQuestion = (id: string, data: any): Promise<any> => {
  return request.patch(`/question/update/${id}`, data)
}

/**
 * 获取问卷详情
 * @param id
 * @returns
 */
export const getQuestion = (id: string): Promise<any> => {
  return request.get(`/question/detail/${id}`)
}

/**
 * 获取问卷列表
 * @returns
 */
export const getQuestions = (): Promise<any> => {
  return request.get(`/question/list`)
}

/**
 * 获取问卷内容
 * @param id
 * @returns
 */
export const getQuestionContent = (id: string): Promise<any> => {
  return request.get(`/question/content/${id}`)
}
