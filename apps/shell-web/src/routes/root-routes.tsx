import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoutes, useLoaderData, useLocation, Outlet } from 'react-router-dom'
import { importRemote } from '@sportback/core'
import { NavLayout } from '@/features/layout'
import { useRootStore } from '@/stores'
import { AppModule, AppNav, AppRoute } from '@/types'
import { PageLoading } from '@/features/common'
import { getNodeByKey } from '@/utils/node'

/**
 * 根路由
 * @returns
 */
export const RootRoutes = () => {
  const { setAppNavs, appNavTree } = useRootStore((state) => state)
  // 记录路由加载状态
  const isLoading = useRef(true)
  //  初始路由 loading页
  const [routes, setRoutes] = useState([{ path: '*', element: <PageLoading /> }])
  const { pathname } = useLocation()
  const { modules, navs } = useLoaderData() as any

  // 加载远程模块
  const loadRemoteRoutes = async (modules: Array<AppModule>) => {
    const promiseAll: any = []
    modules.forEach((mo: AppModule) => {
      promiseAll.push(
        importRemote({
          url: `${mo.moduleUrl}`,
          scope: mo.moduleScope,
          module: mo.importModule,
          remoteEntryFileName: mo.entryFile
        })
      )
    })

    // 根据远程模块地址，获取路由
    const allModules = await Promise.all(promiseAll)
    const appRoutes: Array<AppRoute> = []
    modules.forEach((mo: AppModule, index: any) => {
      // 校验有效权限
      const child = allModules[index] ? checkFunctionCode(allModules[index].default, navs) : []
      if (child && child.length > 0) {
        appRoutes.push({
          path: mo.modulePath,
          element: <Outlet />,
          children: child
        })
      }
    })
    return appRoutes
  }

  // 初始化路由
  const initRoutes = useCallback(async () => {
    const _routes = await loadRemoteRoutes(modules)

    const newRoutes = _routes.map((route: any) => {
      const { showNav = true } = route.handle || {}

      return {
        id: route.id,
        path: route.path,
        element: showNav ? <NavLayout /> : <Outlet />,
        handle: route.handle || {},
        children: route.children
      }
    }) as any

    setRoutes(newRoutes)
    isLoading.current = false
  }, [modules])

  // 校验functionCode
  const checkFunctionCode = (routes: Array<AppRoute>, navs: Array<AppNav>): Array<AppRoute> => {
    return routes.filter((route: AppRoute) => {
      let handle = route.handle
      // 根据functionCode匹配有权限路由
      if (handle && handle.functionCode) {
        if (!!navs.find((nav: AppNav) => nav.functionCode === handle.functionCode)) {
          return true
        }
      } else {
        if (route.children && route.children.length > 0) {
          const _children = checkFunctionCode(route.children, navs)
          if (_children.length > 0) {
            return true
          }
        }
      }
      return false
    })
  }

  useEffect(() => {
    // nav存储到store中
    setAppNavs(navs)

    // 初始化路由数据
    initRoutes()
  }, [])

  useEffect(() => {
    // 监听路由和地址变化
    if (isLoading.current) return

    // 访问根地址时，获取第一个path非空导航
    if (pathname === '/') {
      const firstPath = getNodeByKey(appNavTree, 'path')
      return window.location.replace(firstPath?.path)
    }
  }, [routes, pathname])

  return useRoutes(routes)
}
