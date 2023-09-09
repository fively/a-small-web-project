import { Suspense, ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { PageLoading } from '@/features/common'
import { useRootStore } from '@/stores'
import { AuthProvider } from './auth-provider'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const documentTitle = useRootStore((state) => state.documentTitle)
  return (
    <Suspense fallback={<PageLoading />}>
      <HelmetProvider>
        <Helmet>
          <title>{documentTitle}</title>
        </Helmet>
        <AuthProvider>{children}</AuthProvider>
      </HelmetProvider>
    </Suspense>
  )
}
