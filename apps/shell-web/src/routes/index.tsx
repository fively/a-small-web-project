import { Route, Routes } from 'react-router-dom'
import { lazily } from '@sportback/core'

const { LoginCenter } = lazily(() => import('@/features/login'))

/**
 * 应用路由
 * @returns
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginCenter />} />
    </Routes>
  )
}
