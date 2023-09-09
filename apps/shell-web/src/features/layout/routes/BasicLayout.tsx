import { Outlet } from 'react-router-dom'
/**
 * 空导航布局
 * @returns
 */
export const BasicLayout = () => {
  console.log('BasicLayout?????')

  return (
    <>
      <Outlet />
    </>
  )
}
