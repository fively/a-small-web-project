import { create } from 'zustand'
import { AppNav, AppRoute } from '@/types'
import { getFunctions } from '@/service'
import { createNavTree } from '@/features/layout'

type State = {
  // 页面标题
  documentTitle: String
  // 应用导航
  appNavs: Array<AppNav>
  appNavTree: Array<AppNav>
  // 当前匹配路由
  appMatchRoute: Array<AppRoute>
}

type Action = {
  setDocumentTitle: (modules: State['documentTitle']) => void
  setAppMatchRoute: (routes: State['appMatchRoute']) => void
  initFunctions: () => any
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
  setAppMatchRoute: (routes) => set(() => ({ appMatchRoute: routes })),
  initFunctions: () => {
    //目前直接返回，不做store存储处理
    return new Promise((resolve, reject) => {
      getFunctions()
        .then((res: any) => {
          set({ appNavs: res.navs })
          setTimeout(() => {
            set({ appNavTree: createNavTree(res.navs as any) as any })
          }, 0)
          resolve(res)
        })
        .catch(() => {
          reject({})
        })
    })
  }
}))
