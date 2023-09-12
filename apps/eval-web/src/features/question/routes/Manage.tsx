import { useEffect, useState } from 'react'
import { useMatches, useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'

import { ContentLayout } from '@/components/ContentLayout'
import { SearchPanel } from '../components/SearchPanel'
import { ListItem } from '../components/ListItem'
import { EditQuestion } from '../components/EditQuestion'
import { DataEmpty } from '@/components/DataEmpty'

import styles from '../styles/index.module.scss'
import { getQuestions } from '@/service'

/**
 * 问卷列表
 * @returns
 */
export const QuestionManage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [dataList, setDataList] = useState([])
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const matches = useMatches()

  console.log('matches:', matches)

  useEffect(() => {
    handleSearch()
  }, [])

  const [pagination, setPagination] = useState({
    current: 1,
    total: 50
  })

  /**
   * 编辑量表
   * @param e
   */
  const handleEdit = (e: any) => {
    setCurrentQuestion(e)
    setShowEdit(true)
  }

  /**
   * 查询
   */
  const handleSearch = async () => {
    setLoading(true)
    try {
      const data = await getQuestions()
      setDataList(data)
    } catch (e) {
      console.log('e:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContentLayout>
      <EditQuestion
        current={currentQuestion}
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        onFinish={() => {
          setShowEdit(false)
          handleSearch()
        }}
      />

      {!loading && dataList.length <= 0 && (
        <DataEmpty message="暂无量表记录" buttonText="立即创建量表" onButtonClick={() => setShowEdit(true)} />
      )}

      {!loading && dataList.length > 0 && (
        <>
          <SearchPanel
            onAdd={() => {
              setCurrentQuestion({})
              setShowEdit(true)
            }}
          />
          {dataList.map((item: any) => (
            <ListItem key={item.id} item={item} onEdit={() => handleEdit(item)} />
          ))}
          <Pagination
            size="small"
            className={styles.pagination}
            showSizeChanger
            defaultCurrent={pagination.current}
            total={pagination.total}
          />
        </>
      )}
    </ContentLayout>
  )
}
