import { useState } from 'react'
import { Pagination } from 'antd'

import { ContentLayout } from '@/components/ContentLayout'
import { SearchPanel } from '../components/SearchPanel'
import { ListItem } from '../components/ListItem'

import styles from '../styles/index.module.scss'
import { useMatches } from 'react-router-dom'

/**
 * 问卷列表
 * @returns
 */
export const QuestionManage = () => {
  const matches = useMatches()

  console.log('matches:', matches)

  const [pagination, setPagination] = useState({
    current: 1,
    total: 50
  })
  return (
    <ContentLayout>
      <SearchPanel />
      {new Array(10).fill(0).map((item, index) => (
        <ListItem key={index} />
      ))}
      <Pagination
        size="small"
        className={styles.pagination}
        showSizeChanger
        defaultCurrent={pagination.current}
        total={pagination.total}
      />
    </ContentLayout>
  )
}
