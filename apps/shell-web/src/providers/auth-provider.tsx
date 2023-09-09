import React, { useState } from 'react'
import { storage } from '@sportback/core'
import { postLogin, postLogout } from '@/service'

interface AuthContextType {
  isAuthenticated: boolean
  login: ({ account, password }: { account: string; password: string }, callback: VoidFunction) => Promise<any>
  logout: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)

/**
 * 授权
 * @param param0
 * @returns
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!storage.get('__auth_token__'))

  const login = ({ account, password }: { account: string; password: string }, callback: VoidFunction) => {
    return postLogin({ account, password }).then((res: any) => {
      if (res) {
        setIsAuthenticated(true)
        storage.set('__auth_token__', res)
        callback()
      }
    })
  }

  const logout = (callback: VoidFunction) => {
    return postLogout().then((res: any) => {
      setIsAuthenticated(false)
      callback()
    })
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
