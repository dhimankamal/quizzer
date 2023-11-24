'use client'

import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import axios from 'axios'

type FieldType = {
  email?: string
  password?: string
  remember?: string
}

export default function LoginPage () {
  const router = useRouter()

  const onFinish = async (values: any) => {
    const id = toast.loading('Please wait...')

    try {
      const res = await axios.post('/api/auth/login', values)
      if (res?.data && res?.data?.token) {
        cookie.set('token', res?.data?.token, { expires: 1 })
        toast.update(id, {
          render: 'Welcome! You have successfully logged in to your account.',
          type: 'success',
          isLoading: false,
          autoClose: 6000
        })
        router.push('/dashboard')
      } else {
        toast.update(id, {
          render:
            "Sorry, we couldn't log you in. Please check your email and password and try again.",
          type: 'error',
          isLoading: false,
          autoClose: 7000
        })
      }
      console.log('res', res)
    } catch (error) {
      toast.update(id, {
        render:
          "Sorry, we couldn't log you in. Please check your email and password and try again.",
        type: 'error',
        isLoading: false,
        autoClose: 7000
      })
      console.log('error', error)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className=''>
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

        <Form.Item<FieldType>
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' className='bg-blue-600' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
