import styles from './index.module.scss'
type PropsType = {
  title: string
}
/**
 * 页面小标题
 * @param param0
 * @returns
 */
export const PageTitle = ({ title }: PropsType) => {
  return <header className={styles['page-title']}>{title}</header>
}
