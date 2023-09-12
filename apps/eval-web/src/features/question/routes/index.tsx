import { lazily } from '@sportback/core'

const { QuestionManage } = lazily(() => import('./Manage'))
const { QuestionTrash } = lazily(() => import('./Trash'))

export const QuestionRoutes = [
  {
    index: true,
    element: <QuestionManage />,
    handle: {
      title: '问卷列表',
      functionCode: 'question-manage'
    }
  },
  {
    path: 'trash',
    element: <QuestionTrash />,
    handle: {
      title: '问卷回收站',
      functionCode: 'question-trash'
    }
  }
]
