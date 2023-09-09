import { lazily } from '@sportback/core'

const { Main } = lazily(() => import('./Main'))
const { Preview } = lazily(() => import('./Preview'))

export const EditorRoutes = [
  {
    index: true,
    element: <Main />,
    handle: {
      title: '',
      functionCode: ''
    }
  },
  {
    path: 'preview',
    element: <Preview />,
    handle: {
      title: '',
      functionCode: ''
    }
  }
]
