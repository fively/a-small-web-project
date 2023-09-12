import { lazily } from '@sportback/core'

const { LoginCenter, RegisterCenter } = lazily(() => import('@/features/auth'))

/**
 * 公开路由
 */
export const PublicRoute = [
  {
    path: '/login',
    element: <LoginCenter />
  },
  {
    path: '/register',
    element: <RegisterCenter />
  }
]
