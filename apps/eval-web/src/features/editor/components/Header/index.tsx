import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

type PropsType = {
  title: string
}

export const EditorHeader = ({ title }: PropsType) => {
  const navigate = useNavigate()

  // 返回
  const handleReturn = () => {
    navigate('/eval/question')
  }

  return (
    <header className={styles.header}>
      <h2>
        <span className={styles.return} onClick={handleReturn}>
          返回
        </span>
        {title}
      </h2>
    </header>
  )
}
