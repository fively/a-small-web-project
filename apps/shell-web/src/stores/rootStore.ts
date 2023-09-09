import { create } from 'zustand'
import { AppNav, AppRoute } from '@/types'
import { getFunctions } from '@/service'
import { createNodeTree } from '../utils/node'

type State = {
  // 页面标题
  documentTitle: String
  // 应用导航
  appNavs: Array<AppNav>
  // 应用导航树
  appNavTree: Array<AppNav>
  // 当前匹配路由
  appMatchRoute: Array<AppRoute>
}

type Action = {
  setDocumentTitle: (modules: State['documentTitle']) => void
  setAppNavs: (navs: State['appNavs']) => void
  setAppMatchRoute: (routes: State['appMatchRoute']) => void
  initFunctions: () => void
}

/**
 * root store
 */
export const useRootStore = create<State & Action>((set) => ({
  initLoading: true,
  documentTitle: '',
  appNavs: [],
  appNavTree: [],
  appMatchRoute: [],
  setDocumentTitle: (title) => set(() => ({ documentTitle: title })),
  setAppNavs: (navs) => {
    set({ appNavs: navs })
    set({ appNavTree: createNodeTree(navs as any, { id: '' }) as any })
  },
  setAppMatchRoute: (routes) => set(() => ({ appMatchRoute: routes })),
  initFunctions: async () => {
    //目前直接返回，不做store存储处理
    return await getFunctions()
  }
}))
