import { Tag } from 'antd'
import styles from './index.module.scss'

type PropsType = {}

export const ListItem = () => {
  return (
    <section className={styles['list-item']}>
      <header>
        <Tag color="success">已发布</Tag>问卷的标题栏
        <span className={styles['public-time']}>发布时间：2023-01-01 11:00</span>
      </header>
      <div className={styles.content}>
        <p className={styles.desc}>关于问卷的基本介绍在这里</p>
        <div className={styles.buttons}>
          <span>编辑</span>
          <span>设计问卷</span>
          <span>复制</span>
          <span>删除</span>
        </div>
      </div>
    </section>
  )
}
