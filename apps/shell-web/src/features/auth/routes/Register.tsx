import { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Button, Form, Input } from 'antd'
import '../styles/register.scss'

/**
 * 登录中心
 * @returns
 */
export const RegisterCenter = () => {
  const handleSubmit = async ({ account, password }: { account: string; password: string }) => {}

  return (
    <HelmetProvider>
      <Helmet>
        <title>注册</title>
      </Helmet>
      <section className="register">
        <section className="register-image"></section>
        <section className="register-form">
          <header>
            <i className="logo" /> 物来顺应，未来不迎，当时不杂，既过不恋
          </header>
          <section className="register-form__content">
            <div className="register-form__content-wrap">
              <h2>用户注册</h2>
              <Form name="basic" wrapperCol={{ span: 24 }} autoComplete="off" onFinish={handleSubmit}>
                <Form.Item
                  name="account"
                  rules={[
                    { required: true, message: '请输入注册账号！' },
                    { type: 'string', min: 2, max: 32, message: '注册账号长度不能小于2个字符！' }
                  ]}
                >
                  <Input placeholder="注册账号" />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: '请输入您的姓名！' },
                    { type: 'string', min: 2, max: 20, message: '姓名长度不能小于1个字符！' }
                  ]}
                >
                  <Input placeholder="您的姓名" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: '请输入登录密码！' }]}>
                  <Input.Password placeholder="登录密码" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请再次输入登录密码！' }]}>
                  <Input.Password placeholder="再次输入登录密码" />
                </Form.Item>
                <Form.Item name="email">
                  <Input placeholder="邮箱地址" />
                </Form.Item>
                <Form.Item className='register-form__submit'>
                  <Button type="primary" htmlType="submit" block>
                    立即注册
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
