import { AppNav } from '@/types'

/**
 * 创建导航树
 * @param navs
 * @param parentId
 * @param root
 * @returns
 */
export const createNavTree = (navs: Array<AppNav>, parentId: string = '', root?: AppNav) => {
  const children = [] as Array<AppNav>

  navs
    .filter((n: AppNav) => n.parentId === parentId)
    .forEach((n: AppNav) => {
      if (!n.parentId) {
        root = n
      }

      children.push({
        ...n,
        id: n.id,
        rootId: root ? root.id : n.id,
        parentId: parent ? parentId : n.id,
        parentIds: n.parentIds,
        children: createNavTree(navs, n.id, root)
      })
    })

  return children
}
/**
 * 获取导航中第一个跳转地址
 * @param navs
 * @param parentId
 * @returns
 */
export const getNavFirstPath = (navs: Array<AppNav>, parentId: string = ''): AppNav | undefined => {
  const _navs = navs.filter((n: AppNav) => n.parentId === parentId).sort((a, b) => a.order - b.order)
  const _nav = _navs.find((n: AppNav) => n.path)

  if (_nav) {
    return _nav
  }

  for (var i = 0; i < _navs.length; i++) {
    const __nav = getNavFirstPath(navs, _navs[i].id)
    if (__nav) {
      return __nav
    }
  }

  return undefined
}
