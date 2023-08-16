import { ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import theme from './theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      {children}
    </ConfigProvider>
  )
}
