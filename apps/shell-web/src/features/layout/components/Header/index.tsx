import { Popover, MenuProps } from 'antd'
import { AppNav } from '@/types'
import './index.scss'
interface HeaderProps {
  active: string
  navs: Array<AppNav>
  onSelect: (nav: AppNav) => void
}

export const Header = ({ active, navs, onSelect }: HeaderProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          个人中心
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          退出登录
        </a>
      )
    }
  ]

  const popoverNav = () => {
    return (
      <ul className="lt-header__popover">
        <li>个人中心</li>
        <li>退出登录</li>
      </ul>
    )
  }

  return (
    <header className="lt-header">
      <section className="lt-header__logo">LOGO</section>
      <ul className="lt-header__navs">
        {navs &&
          navs.map((nav: AppNav) => (
            <li
              className={active === nav.id ? 'lt-header__navs-item active' : 'lt-header__navs-item'}
              key={nav.id}
              onClick={() => onSelect(nav)}
            >
              {nav.name}
            </li>
          ))}
      </ul>
      <section className="lt-header__avatar">
        <Popover placement="bottomRight" style={{ padding: 0 }} content={popoverNav} arrow={false} trigger="click">
          <img src="https://fively-photo.oss-cn-shanghai.aliyuncs.com/default-header.jpeg" />
        </Popover>
      </section>
    </header>
  )
}
