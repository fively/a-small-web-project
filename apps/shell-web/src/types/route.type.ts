/**
 * 模块类型
 */
export type AppModule = {
  moduleId: string
  moduleName: string
  modulePath: string
  moduleUrl: string
  entryFile: string
  moduleScope: string
  importModule: string
}

/**
 * 导航类型
 */
export type AppNav = {
  id: string
  rootId?: string
  parentId?: string
  parentIds?: string
  code: string
  name: string
  icon?: string
  path: string
  level: number
  order: number
  children?: Array<AppNav>
}

/**
 * 应用路由
 */
export type AppRoute = {
  path: string
  index?: boolean
  code?: string
  handle?: object | any
  element?: any
  errorElement?: any
  children?: Array<AppRoute> | any
}
