import { Outlet } from 'react-router-dom'
import { QuestionRoutes } from '@/features/question'
import { EditorRoutes } from '@/features/editor'
import { StatRoutes } from '@/features/stat'

export default [
  {
    path: 'question',
    handle: {
      title: '问卷管理',
      functionCode: 'question'
    },
    children: QuestionRoutes
  },
  {
    path: 'editor/:id',
    handle: {
      title: '问卷编辑',
      functionCode: 'question-editor',
      fullScreen: true
    },
    children: EditorRoutes
  },
  {
    path: 'stat',
    handle: {
      title: '问卷统计',
      functionCode: 'question-stat'
    },
    children: StatRoutes
  }
]
