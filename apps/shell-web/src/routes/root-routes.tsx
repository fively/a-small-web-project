import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRoutes, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { importRemote } from '@sportback/core'
import { BasicLayout, getNavFirstPath } from '@/features/layout'
import { useRootStore } from '@/stores'
import { AppModule, AppNav, AppRoute } from '@/types'
import { CommonRoute } from './module/common-route'
import { PageLoading } from '@/features/common'

/**
 * 根路由
 * @returns
 */
export const RootRoutes = React.memo(() => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 获取store中初始化方法和导航tree
  const { initFunctions, appNavs } = useRootStore((state) => state)

  // 记录路由加载状态
  const isLoading = useRef(true)
  // //  初始路由loading页
  const [routes, setRoutes] = useState([{ path: '*', element: <PageLoading /> }])

  // 初始化路由
  const initRoutes = useCallback(async ({ modules, navs }: { modules: any; navs: any }) => {
    const _routes = await loadRemoteRoutes(modules, navs)
    const newRoutes = _routes.concat(CommonRoute) as any
    setRoutes(newRoutes)
    isLoading.current = false
  }, [])

  useEffect(() => {
    // 加载导航权限，初始化路由
    initFunctions().then((res: any) => {
      initRoutes(res)
    })
  }, [])

  useEffect(() => {
    // 监听路由和地址变化
    if (isLoading.current) return

    // 访问根地址时，获取第一个path非空导航
    if (pathname === '/') {
      const firstPath = getNavFirstPath(appNavs)
      if (firstPath) {
        return navigate(firstPath.path, { replace: true })
      }
    }
  }, [routes, pathname])

  return useRoutes(routes)
})

/**
 * 加载远程模块路由
 * @param modules
 * @param navs
 * @returns
 */
const loadRemoteRoutes = async (modules: Array<AppModule>, navs: any) => {
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
    const moduleRoutes = allModules[index] ? checkFunctionCode(allModules[index].default, navs) : []

    // 对路由进行布局填充
    const changeRoute = (routes: Array<AppRoute>) => {
      return routes.map((route: AppRoute) => {
        const { handle = {} } = route
        if (handle && !handle.fullScreen) {
          route.element = <BasicLayout />
        }
        return route
      })
    }

    if (moduleRoutes && moduleRoutes.length > 0) {
      appRoutes.push({ path: mo.modulePath, children: changeRoute(moduleRoutes) })
    }
  })
  return appRoutes
}

/**
 * 校验functionCode
 * @param routes
 * @param navs
 * @returns
 */
const checkFunctionCode = (routes: Array<AppRoute>, navs: Array<AppNav>): Array<AppRoute> => {
  return routes.filter((route: AppRoute) => {
    if (Array.isArray(route.children) && route.children.length > 0) {
      const _children = checkFunctionCode(route.children, navs)
      return _children.length > 0
    }

    // 根据functionCode匹配有权限路由
    const { handle = {} } = route

    if (handle.functionCode) {
      return !!navs.find((nav: AppNav) => nav.code === handle.functionCode)
    }
    return false
  })
}
