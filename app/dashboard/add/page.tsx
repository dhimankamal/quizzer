'use client'
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio } from 'antd'
import axios from 'axios'
import { useProfileStore } from '@/lib/hooks/store'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function AddQuiz () {
  const { profile } = useProfileStore()
  const router = useRouter();
  const onFinish = async (values: any) => {
    const id = toast.loading('Please wait...')
    try {
      const res = await axios.post('/api/quiz', {
        ...values,
        userid: profile?.id
      })
      toast.update(id, {
        render: ' You have successfully create quiz',
        type: 'success',
        isLoading: false,
        autoClose: 6000
      })
      router.push('/dashboard')
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
    <div className='p-4'>
      <h1 className='font-bold text-2xl'>Add a new quizz</h1>
      <div className='my-4'>
        <Form
          name='dynamic_form_nest_item'
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label='Name of quizz'
            name='name'
            rules={[
              { required: true, message: 'Please input your quizz name!' }
            ]}
          >
            <Input size='large' />
          </Form.Item>
          <h2 className='text-xl font-bold mt-6'>Add questions</h2>
          <Form.List name='questions'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='my-4'>
                    <Form.Item
                      {...restField}
                      label='Title'
                      name={[name, 'title']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <Input placeholder='Enter the Question' size='large' />
                    </Form.Item>
                    <div>
                      <Form.Item
                        {...restField}
                        name={[name, 'option1']}
                        label='Option 1'
                        rules={[
                          { required: true, message: 'Missing Enter options' }
                        ]}
                      >
                        <Input placeholder='Enter options' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'option2']}
                        label='Option 2'
                        rules={[
                          { required: true, message: 'Missing Enter options' }
                        ]}
                      >
                        <Input placeholder='Enter options' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'option3']}
                        label='Option 3'
                        rules={[
                          { required: true, message: 'Missing Enter options' }
                        ]}
                      >
                        <Input placeholder='Enter options' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'option4']}
                        label='Option 4'
                        rules={[
                          { required: true, message: 'Missing Enter options' }
                        ]}
                      >
                        <Input placeholder='Enter options' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label='Correct Answer'
                        name={[name, 'answer']}
                        rules={[
                          { required: true, message: 'Missing Enter options' }
                        ]}
                      >
                        <Radio.Group>
                          <Radio.Button value='option1'>Option 1</Radio.Button>
                          <Radio.Button value='option2'>Option 2</Radio.Button>
                          <Radio.Button value='option3'>Option 3</Radio.Button>
                          <Radio.Button value='option4'>Option 4</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </div>

                    <MinusCircleOutlined rev='' onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined rev='' />}
                  >
                    New question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type='primary' className='bg-blue-600' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
