import { useNavigate } from 'react-router-dom'
import { Tag } from 'antd'
import styles from './index.module.scss'

type PropsType = {
  item: {
    id: string
    name: string
    desc: string
    publishTime?: string
    publishStatus: number
  }
  onEdit?: () => void
}

export const ListItem = ({ item, onEdit }: PropsType) => {
  const navigate = useNavigate()

  const handleDesign = () => {
    navigate(`/eval/editor/${item.id}`)
  }
  return (
    <section className={styles['list-item']}>
      <header>
        {item.publishStatus ? <Tag color="success">已发布</Tag> : <Tag>未发布</Tag>}
        {item.name}
        {item.publishTime && <span className={styles['public-time']}>发布时间：{item.publishTime}</span>}
      </header>
      <div className={styles.content}>
        <p className={styles.desc}>{item.desc}</p>
        <div className={styles.buttons}>
          <span onClick={() => onEdit && onEdit()}>编辑</span>
          <span onClick={handleDesign}>设计问卷</span>
          <span>复制</span>
          <span>删除</span>
        </div>
      </div>
    </section>
  )
}
