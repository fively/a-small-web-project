import { Button, Select, Input } from 'antd'
import styles from './index.module.scss'

type PropsType = {
  onAdd: () => void
}

export const SearchPanel = ({ onAdd }: PropsType) => {
  return (
    <section className={styles['search-panel']}>
      <div className={styles.buttons}>
        <Button size="middle" type="primary" onClick={onAdd}>
          新建问卷
        </Button>
      </div>
      <div className={styles.form}>
        <Select
          defaultValue=""
          style={{ width: 200 }}
          options={[
            { value: '', label: '全部' },
            { value: '0', label: '未发布' },
            { value: '1', label: '已发布' }
          ]}
        />
        <Input placeholder="输入关键字定位" />
      </div>
    </section>
  )
}
