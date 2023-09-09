import styles from './index.module.scss'

type PropsType = {
  children: React.ReactNode
}

/**
 * 内容布局
 * @param param0
 * @returns
 */
export const ContentLayout = ({ children }: PropsType) => {
  return <section className={styles['content-layout']}>{children}</section>
}
