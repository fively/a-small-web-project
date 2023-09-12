import { useEffect, useState } from 'react'
import { Button, Drawer, Form, Input, Select, message } from 'antd'
import { createQuestion, getQuestion, updateQuestion } from '@/service'
import styles from './index.module.scss'

type PropsType = {
  current?: any
  visible: boolean
  onClose?: () => void
  onFinish?: () => void
}

/**
 * 编辑问卷
 * @param param0
 * @returns
 */
export const EditQuestion = ({ current, visible, onClose, onFinish }: PropsType) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (!visible) return

    if (!current || !current.id) {
      form.setFieldsValue({ name: '', desc: '', mode: 'score', type: 'common', memo: '' })
      return
    }

    fetchQuestion()
  }, [visible])

  /**
   * 重新加载问卷记录，防止本地缓存
   */
  const fetchQuestion = async () => {
    const question = await getQuestion(current.id)

    form.setFieldsValue(question)
  }

  /**
   * 提交问卷信息
   */
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const formData = await form.validateFields()
      const msg: any = { type: 'success', content: '操作成功' }
      if (current && current.id) {
        await updateQuestion(current.id, formData)
        msg.content = '更新成功'
      } else {
        await createQuestion(formData)
        msg.content = '创建成功'
      }

      messageApi.open({
        ...msg,
        duration: 2,
        onClose: () => {
          setLoading(false)
          onFinish && onFinish()
        }
      })
    } catch (e) {
      setLoading(false)
      console.log('handleSubmit error:', e)
    }
  }

  return (
    <Drawer
      title={current && current.id ? '编辑量表' : '新建量表'}
      placement="right"
      width={680}
      className={styles.edit}
      closeIcon={false}
      onClose={() => {
        !loading && onClose && onClose()
      }}
      open={visible}
      destroyOnClose
      footer={
        <div className={styles.footer}>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            提交信息
          </Button>
          <Button disabled={loading} onClick={onClose}>
            返回
          </Button>
        </div>
      }
    >
      {contextHolder}
      <Form
        labelCol={{ span: 3 }}
        form={form}
        disabled={loading}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        scrollToFirstError
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[
            { required: true, message: '请输入量表名称' },
            { type: 'string', min: 2, max: 32, message: '登录账号长度在 2-20 之间！' }
          ]}
        >
          <Input placeholder="输入量表名称" />
        </Form.Item>
        <Form.Item
          label="摘要"
          name="desc"
          rules={[
            { required: true, message: '请输入量表摘要' },
            { type: 'string', min: 2, max: 32, message: '登录账号长度在 2-20 之间！' }
          ]}
        >
          <Input.TextArea showCount maxLength={128} style={{ height: 80, resize: 'none' }} placeholder="输入摘要" />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Select>
            <Select.Option value="disease">病程量表</Select.Option>
            <Select.Option value="common">公共量表</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="模式" name="mode">
          <Select>
            <Select.Option value="score">分值</Select.Option>
            <Select.Option value="qa">问答</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="备注" name="memo">
          <Input.TextArea showCount maxLength={128} style={{ height: 80, resize: 'none' }} placeholder="输入备注" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
