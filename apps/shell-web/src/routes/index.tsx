import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootRoutes } from './root-routes'
import { useRootStore } from '@/stores'
import { ErrorPage, PageLoading } from '@/features/common'
import { lazily } from '@sportback/core'
import { useAuth } from '@/hooks'

const { LoginCenter, RegisterCenter } = lazily(() => import('@/features/auth'))

export const AppRoutes = () => {
  const auth = useAuth()

  // 根路由渲染时，加载路由数据
  const rootLoader = async () => {
    const { initFunctions } = useRootStore((state) => state)

    if (auth.isAuthenticated) {
      return await initFunctions()
    } else {
      return new Promise((resolve) => setTimeout(() => ({})))
    }
  }

  // 系统路由
  const routes = [
    {
      path: '/*',
      loader: rootLoader,
      element: auth.isAuthenticated ? <RootRoutes /> : <PageLoading />,
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <LoginCenter />
    },
    {
      path: '/register',
      element: <RegisterCenter />
    }
  ]

  const router = createBrowserRouter(routes)

  useEffect(() => {
    if (auth.isAuthenticated) return

    // 未授权时，如果访问非登录页面，则直接跳转登录页面
    const { pathname } = window.location
    if (pathname === '/login') return
    window.location.replace('/login')
  }, [])

  return <RouterProvider router={router} />
}
