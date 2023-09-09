import { AppNav } from '@/types'
import { ReactElement } from 'react'
import './index.scss'

interface AsideProps {
  active: string
  navs: Array<AppNav>
  onSelect: (nav: AppNav) => void
}

/**
 * 创建导航节点
 * @param navs
 */
const createNavChildren = (navs: Array<AppNav>, active: string, onSelect: (nav: AppNav) => void) => {
  return navs.map((nav: AppNav) => {
    let element: ReactElement | null = null
    if (Array.isArray(nav.children) && nav.children.length > 0) {
      element = (
        <div key={nav.id} className="lt-aside__nav-group">
          <header>{nav.name}</header>
          <ul className="lt-aside__nav-items">
            {Array.isArray(nav.children) && createNavChildren(nav.children, active, onSelect)}
          </ul>
        </div>
      )
    } else {
      element = (
        <li key={nav.id} className={nav.id === active ? 'active' : ''} onClick={() => onSelect(nav)}>
          {nav.name}
        </li>
      )
    }

    return element
  })
}

/**
 * 侧边导航
 * @param param0
 * @returns
 */
export const Aside = ({ active, navs, onSelect }: AsideProps) => {
  return <aside className="lt-aside">{Array.isArray(navs) && createNavChildren(navs, active, onSelect)}</aside>
}
