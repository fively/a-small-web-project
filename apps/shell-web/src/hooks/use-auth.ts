import React from 'react'
import { AuthContext } from '@/providers/auth-provider'

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }

  return context
}
