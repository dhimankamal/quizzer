'use client'

import { Questions, User } from '@prisma/client'
import { Button, Form, Radio, Space } from 'antd'
import React from 'react'

type Props = {
  data: {
    user: User
    Questions: Questions[]
  }
}

export default function Questions ({ data }: Props) {
  console.log('data', data)

  const onFinish = (value: any) => {
    console.log('value', value)
  }
  return (
    <section className='border p-4'>
      <Form
        name='dynamic_form_nest_item'
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
      >
        <ul>
          {data.Questions.map(
            ({ id, name, option1, option2, option3, option4, sno }) => {
              return (
                <li key={id}>
                  <h2 className='text-xl font-bold'>
                    {sno} {name}
                  </h2>
                  <Form.Item
                    name={id}
                    rules={[
                      { required: true, message: 'Missing Enter options' }
                    ]}
                  >
                    <Radio.Group>
                      <div className='grid p-4 gap-2'>
                        <Radio value='option1'>{option1}</Radio>
                        <Radio value='option2'>{option2}</Radio>
                        <Radio value='option3'>{option3}</Radio>
                        <Radio value='option4'>{option4}</Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </li>
              )
            }
          )}
        </ul>
        <Form.Item>
          <Button type='primary' className='bg-blue-600' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}
