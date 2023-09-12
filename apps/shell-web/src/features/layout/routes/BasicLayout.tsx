import { Suspense, useEffect, useState } from 'react'
import { Outlet, useMatches, useNavigate } from 'react-router-dom'
import { useRootStore } from '@/stores'
import { AppNav } from '@/types'
import { getNavFirstPath } from '../utils'
import styles from '../styles/nav.module.scss'

import { Header } from '../components/Header'
import { Aside } from '../components/Aside'
import { PageLoading } from '@/features/common'
/**
 * 导航布局
 * @returns
 */
export const BasicLayout = () => {
  const navigate = useNavigate()
  const matches = useMatches()
  const { appNavTree, appNavs } = useRootStore((state) => state)
  const [active, setActive] = useState({ highNav: '', highAside: '' })
  const [asideNavs, setAsideNavs] = useState([] as Array<AppNav>)

  useEffect(() => {
    initActive()
  }, [])

  /**
   * 进入页面时，根据导航地址进行高亮定位
   */
  const initActive = () => {
    const { pathname = '' } = matches[matches.length - 1] || {}
    const activeNav = appNavs.find((n) => n.path === pathname)
    if (!activeNav) {
      return setActive({
        highNav: '',
        highAside: ''
      })
    }

    if (!activeNav.parentIds) return

    const [rootId] = activeNav.parentIds.split(',')
    setActive({
      highNav: rootId,
      highAside: activeNav.id
    })

    if (appNavTree) {
      const _nav = appNavTree.find((a: AppNav) => a.id === rootId)
      setAsideNavs(_nav ? _nav.children || [] : [])
    }
  }

  /**
   * 顶部导航选择
   * @param e
   * @returns
   */
  const handleNavSelect = (e: AppNav) => {
    if (!e) return

    // 设置左侧导航
    setAsideNavs(e.children || [])

    // 点击顶部导航时，默认跳转子树中第一个path非空导航
    const { path = '', id = '' } = getNavFirstPath(appNavs, e.id) || {}
    if (!path) return

    // 设置高亮
    setActive({ highNav: e.id, highAside: id })
    // 路由切换
    navigate(path)
  }

  /**
   * 左侧导航选择跳转
   * @param e 
   * @returns 
   */
  const handleAsideSelect = (e: AppNav) => {
    if (!e || !e.path) return

    setActive({
      ...active,
      highAside: e.id
    })

    navigate(e.path)
  }

  return (
    <section className={styles.navlayout}>
      <Header navs={appNavTree} active={active.highNav || ''} onSelect={handleNavSelect} />
      <div className={styles.wrap}>
        {asideNavs && asideNavs.length > 0 && (
          <div className={styles.aside}>
            <Aside active={active.highAside} navs={asideNavs} onSelect={handleAsideSelect} />
          </div>
        )}

        <div className={styles.content}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
