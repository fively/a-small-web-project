import { lazily } from '@sportback/core'
import { BasicLayout } from '@/features/layout'

const { UserCenter, UserSetting } = lazily(() => import('@/features/user'))

/**
 * 系统内通用路由
 */
export const CommonRoute = [
  {
    path: 'user',
    element: <BasicLayout />,
    children: [
      {
        path: 'center',
        element: <UserCenter />
      },
      {
        path: 'setting',
        element: <UserSetting />
      }
    ]
  },
  {
    path: '404',
    element: <div>this is 404</div>
  },
  {
    path: '403',
    element: <div>this is 403</div>
  },
  {
    path: '500',
    element: <div>this is 500</div>
  }
]
