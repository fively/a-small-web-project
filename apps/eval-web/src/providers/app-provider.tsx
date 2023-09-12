import { Suspense, ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <HelmetProvider>
      <Suspense fallback={<div>loading</div>}>{children}</Suspense>
    </HelmetProvider>
  )
}
