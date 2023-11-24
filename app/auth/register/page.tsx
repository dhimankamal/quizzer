'use client'

import React from 'react'
import { Form, Input, Button, Radio } from 'antd'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type FieldType = {
  name?: string
  password?: string
  email?: string
  role?: string
}

export default function RegisterPage () {
  const router = useRouter()
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = async (values: any) => {
    const id = toast.loading('Please wait...')

    try {
      const res = await axios.post('/api/auth/register', values)
      if (res?.data && res?.data?.token) {
        toast.update(id, {
          render: 'Welcome! You have successfully register your account.',
          type: 'success',
          isLoading: false,
          autoClose: 6000
        })
        router.push('/auth/login')
      } else {
        toast.update(id, {
          render: ' try again.',
          type: 'error',
          isLoading: false,
          autoClose: 7000
        })
      }
    } catch (error) {
      toast.update(id, {
        render: ' try again.',
        type: 'error',
        isLoading: false,
        autoClose: 7000
      })
    }
  }
  return (
    <div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType> label='Role' name='role'>
          <Radio.Group>
            <Radio.Button value='teacher'>Teacher</Radio.Button>
            <Radio.Button value='student'>Student</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' className='bg-blue-600' htmlType='submit'>
            Register Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
