import { lazily } from '@sportback/core'

const { NavMgmt } = lazily(() => import('@/features/nav'))
const { RoleMgmt } = lazily(() => import('@/features/role'))
const { RosterMgmt } = lazily(() => import('@/features/roster'))
const { ModuleMgmt } = lazily(() => import('@/features/module'))

export default [
  {
    path: 'roster',
    element: <RosterMgmt />,
    meta: {
      functionCode: 'os-roster',
      title: '员工手册'
    }
  },
  {
    path: 'role',
    element: <RoleMgmt />,
    meta: {
      functionCode: 'os-role',
      title: '角色管理'
    }
  },
  {
    path: 'nav',
    element: <NavMgmt />,
    meta: {
      functionCode: 'os-nav',
      title: '导航管理'
    }
  },
  {
    path: 'module',
    element: <ModuleMgmt />,
    meta: {
      functionCode: 'os-module',
      title: '模块管理'
    }
  }
]
