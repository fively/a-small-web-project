import { api } from '@sportback/core'

export const request = api.create({
  baseURL: process.env.BASIC_URL
})
