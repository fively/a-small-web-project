import { lazily } from '@sportback/core'

const { NavMgmt } = lazily(() => import('@/features/nav'))
const { RoleMgmt } = lazily(() => import('@/features/role'))
const { RosterMgmt } = lazily(() => import('@/features/roster'))
const { ModuleMgmt } = lazily(() => import('@/features/module'))

export default [
  {
    path: 'roster',
    children: [
      {
        index: true,
        element: <RosterMgmt />,
        handle: {
          functionCode: 'os-roster',
          title: '员工手册'
        }
      }
    ]
  },
  {
    path: 'role',
    children: [
      {
        index: true,
        element: <RoleMgmt />,
        handle: {
          functionCode: 'os-role',
          title: '角色管理'
        }
      }
    ]
  },
  {
    path: 'nav',
    children: [
      {
        index: true,
        element: <NavMgmt />,
        handle: {
          functionCode: 'os-nav',
          title: '导航管理'
        }
      }
    ]
  },
  {
    path: 'module',
    children: [
      {
        index: true,
        element: <ModuleMgmt />,
        handle: {
          functionCode: 'os-module',
          title: '模块管理'
        }
      }
    ]
  }
]
