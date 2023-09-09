import { JSEncrypt } from 'jsencrypt'

/**
 * 密码加密
 * @param data
 * @param key
 * @returns
 */
export const encrypt = (data: string, key: string): string => {
  const jse = new JSEncrypt()
  jse.setPublicKey(key)
  return jse.encrypt(data) as string
}
