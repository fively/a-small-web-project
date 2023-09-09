import { Outlet } from 'react-router-dom'
import { QuestionRoutes } from '@/features/question'
import { EditorRoutes } from '@/features/editor'
import { StatRoutes } from '@/features/stat'

export default [
  {
    path: 'question',
    element: <Outlet />,
    handle: {
      title: '问卷管理',
      functionCode: 'question'
    },
    children: QuestionRoutes
  },
  {
    path: 'editor/:id',
    element: <Outlet />,
    handle: {
      title: '问卷编辑',
      functionCode: 'question-editor'
    },
    children: EditorRoutes
  },
  {
    path: 'stat',
    element: <Outlet />,
    handle: {
      title: '问卷统计',
      functionCode: 'question-stat'
    },
    children: StatRoutes
  }
]
