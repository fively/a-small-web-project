import { Button, Empty } from 'antd'
import styles from './index.module.scss'

type PropsType = {
  message?: string
  buttonText?: string
  onButtonClick?: () => void
}

/**
 * 空状态
 * @param param0
 * @returns
 */
export const DataEmpty = ({ message, buttonText, onButtonClick }: PropsType) => {
  return (
    <section className={styles.empty}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 120 }}
        description={<span style={{ color: '#8c8c8c' }}>{message ? message : '暂无数据'}</span>}
      >
        {onButtonClick && (
          <Button type="primary" className={styles.button} onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </Empty>
    </section>
  )
}
