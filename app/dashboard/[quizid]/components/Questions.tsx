'use client'

import { useProfileStore } from '@/lib/hooks/store'
import { Questions, Record, User } from '@prisma/client'
import { Button, Form, Radio } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {
  data: {
    user: User
    Questions: Questions[]
    id: string
  }
}

export default function Questions ({ data }: Props) {
  const [record, setRecord] = useState<Record | undefined>(undefined)

  const { profile } = useProfileStore()

  const onFinish = async (value: any) => {
    let payload = {
      quizId: data.id,
      userid: profile?.id || '',
      score: 0,
      total: data.Questions.length,
      answer: value
    }
    data.Questions.forEach(element => {
      if (value[element.id] === element.answer) {
        payload.score = payload.score + 1
      }
    })

    try {
      const res = await axios.post('/api/record', payload)
      setRecord(res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const fetchRecord = async () => {
    try {
      const res = await axios.get(
        `/api/record?quizid=${data.id}&userid=${profile?.id}`
      )
      setRecord(res.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchRecord()
  }, [])

  if (record?.id) {
    return (
      <section className='border p-4 bg-green-100 '>
        <h1 className='text-2xl font-bold'>You are done</h1>
        <p>Congrats you complete test.</p>
        <p className='font-bold'>
          Your Score - <span className='font-normal'>{record.score}</span>{' '}
        </p>
        <p className='font-bold'>
          Total Score - <span className='font-normal'>{record.total}</span>{' '}
        </p>
        <p className='font-bold'>
          Date submitted -{' '}
          <span className='font-normal'>
            {' '}
            {dayjs(record?.createdAt).format('ddd, MMM D, YYYY h:mm A')}
          </span>{' '}
        </p>
      </section>
    )
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
                    {sno} - {name}
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
