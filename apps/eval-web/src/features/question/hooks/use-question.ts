import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestion } from '@/service'

/**
 * 获取单个问卷记录
 * @returns
 */
export const useQuestion = () => {
  const { id = '' } = useParams()

  const [loading, setLoading] = useState(true)
  const [question, setQuestion] = useState({})

  useEffect(() => {
    async function fn() {
      const data = await getQuestion(id)
      setQuestion(data)
      setLoading(false)
    }

    fn()
  }, [])

  return { loading, question }
}
