import { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Button, Form, Input } from 'antd'
import '../styles/index.scss'

/**
 * 登录中心
 * @returns
 */
export const LoginCenter = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({ account, password }: { account: string; password: string }) => {}

  return (
    <HelmetProvider>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <section className="login">
        <section className="login-image"></section>
        <section className="login-form">
          <header>
            <i className="logo" /> 物来顺应，未来不迎，当时不杂，既过不恋
          </header>
          <section className="login-form__content">
            <div className="login-form__content-wrap">
              <h2>A Small Web Project</h2>
              <h4>用科技改善生活</h4>
              <Form name="basic" wrapperCol={{ span: 24 }} autoComplete="off" onFinish={handleSubmit}>
                <Form.Item
                  name="account"
                  rules={[
                    { required: true, message: '请输入登录账号！' },
                    { type: 'string', min: 2, message: '登录账号长度不能小于2个字符！' }
                  ]}
                >
                  <Input placeholder="请输入登录账号" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    登 录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </section>
          <footer>© 2023 素材来源于网络，如有侵权，请联系告知</footer>
        </section>
      </section>
    </HelmetProvider>
  )
}
