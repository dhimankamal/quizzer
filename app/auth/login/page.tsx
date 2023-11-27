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
    } catch (error) {
      toast.update(id, {
        render:
          "Sorry, we couldn't log you in. Please check your email and password and try again.",
        type: 'error',
        isLoading: false,
        autoClose: 7000
      })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='w-[400px] mx-auto'>
      <h2 className='text-xl font-bold mb-8'>Login now</h2>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        layout='vertical'
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

        <Form.Item<FieldType> name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <div className='flex gap-4'>
            <Button type='primary' className='bg-blue-600' htmlType='submit'>
              Login
            </Button>
            <Button
              type='primary'
              className='bg-gray-200 text-black hover:!bg-blue-600'
              onClick={() => router.push('/auth/register')}
            >
              Register
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
