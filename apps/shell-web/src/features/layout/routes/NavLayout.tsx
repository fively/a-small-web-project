import { useEffect, useState } from 'react'
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom'
import { useRootStore } from '@/stores'
import { AppNav } from '@/types'
import { getNodeByValue } from '@/utils/node'
import styles from '../styles/nav.module.scss'

import { Header } from '../components/Header'
import { Aside } from '../components/Aside'
/**
 * 导航布局
 * @returns
 */
export const NavLayout = () => {
  console.log('NavLayout?????')
  const location = useLocation()
  const matches = useMatches()
  const { appNavTree, appNavs } = useRootStore((state) => state)
  const [asideNavs, setAsideNavs] = useState([] as Array<AppNav>)
  const [activeNav, setActiveNav] = useState(('' as string) || undefined)

  const handleNavSelect = (e: AppNav) => {
    console.log('e:', e)
    if (!e || !e.children) return
    setAsideNavs(e.children)
  }

  useEffect(() => {
    console.log('location:', location)
    const { pathname = '' } = matches[matches.length - 1] || {}
    const activeNav = appNavs.find((n) => n.path === pathname)

    if (!activeNav) return

    const rootNode = getNodeByValue(appNavTree, 'id', activeNav.id)
    setActiveNav(rootNode?.rootId)

    const rootChildren = appNavTree.find((n) => n.id === rootNode?.rootId)
    setAsideNavs(rootNode?.children)
    console.log('activeNav:', rootNode)
  }, [])

  return (
    <section className={styles.navlayout}>
      <Header navs={appNavTree} active={activeNav || ''} onSelect={handleNavSelect} />
      <div className={styles.wrap}>
        <div className={styles.aside}>
          <Aside active={''} navs={asideNavs} onSelect={() => {}} />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </section>
  )
}
