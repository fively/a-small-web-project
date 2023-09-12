import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useAuth } from '@/hooks'

import { RootRoutes } from './root-routes'
import { PublicRoute } from './module/public-route'
import { ErrorPage, PageLoading } from '@/features/common'

export const AppRoutes = () => {
  const auth = useAuth()

  const routes = [
    {
      path: '/*',
      element: auth.isAuthenticated ? <RootRoutes /> : <PageLoading />,
      errorElement: <ErrorPage />
    },
    ...PublicRoute
  ]

  useEffect(() => {
    if (auth.isAuthenticated) return

    // 未授权时，如果访问非登录页面，则直接跳转登录页面
    const { pathname } = window.location
    if (pathname === '/login') return

    window.location.replace('/login')
  }, [])

  return <RouterProvider router={createBrowserRouter(routes)} />
}
