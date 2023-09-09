import { Spin } from 'antd'
import './index.scss'

export const PageLoading = () => {
  return (
    <section className="page-loading">
      <Spin />
      loading...
    </section>
  )
}
