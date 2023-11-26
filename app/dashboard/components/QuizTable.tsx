import { Button, Table, TableColumnsType } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useProfileStore } from '@/lib/hooks/store'

interface DataType {
  key: React.Key
  name: string
  platform: string
  version: string
  upgradeNum: number
  creator: string
  createdAt: string
}

interface ExpandedDataType {
  key: React.Key
  date: string
  name: string
  upgradeNum: string
}

const expandedRowRender = (val: any) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: 'Question', dataIndex: 'name', key: 'question' },
    { title: 'Option 1', dataIndex: 'option1', key: 'option1' },
    { title: 'Option 2', dataIndex: 'option2', key: 'option2' },
    { title: 'Option 3', dataIndex: 'option3', key: 'option3' },
    { title: 'Option 4', dataIndex: 'option4', key: 'option4' },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      render: val => <p className='capitalize'>Option {val.split('n')[1]}</p>
    }
  ]

  const rcolumns: TableColumnsType<ExpandedDataType> = [
    {
      title: 'Student Name',
      dataIndex: 'user',
      key: 'user',
      render: val => val?.name || '-'
    },
    { title: 'Score', dataIndex: 'score', key: 'score' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    {
      title: 'Submiited on',
      dataIndex: 'createdAt',
      key: 'option3',
      render: val => dayjs(val).format('MMM D, YYYY h:mm A')
    }
  ]

  return (
    <div className='grid gap-4'>
      <div className='border p-4'>
        <h2 className='text-md font-bold'>Quetions</h2>
        <Table
          columns={columns}
          dataSource={val?.Questions || []}
          pagination={false}
        />
      </div>
      <div className='border p-4'>
        <h2 className='text-md font-bold'>Student Record</h2>
        <Table
          columns={rcolumns}
          dataSource={val?.Record || []}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default function QuizTable () {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { profile } = useProfileStore()

  const onDelete = async (id: any) => {
    try {
      const res = await axios.delete(`/api/quiz?id=${id}`)
      if (res.status === 200) {
        fetchData()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Created By',
      key: 'createdby',
      render: val => val?.user?.name || '-'
    },
    {
      title: 'Created',
      key: 'created',
      render: val => dayjs(val.createdAt).format('MMM D, YYYY h:mm A')
    },
    {
      title: 'Updated',
      key: 'updated',
      render: val => dayjs(val.updatedAt).format('MMM D, YYYY h:mm A')
    },
    {
      title: 'Action',
      key: 'action',
      render: val => {
        return val?.user?.id === profile?.id ? (
          <Button onClick={() => onDelete(val?.id)}>Delete</Button>
        ) : (
          ''
        )
      }
    }
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/quiz')
      if (res.status === 200) {
        setData(res?.data.map((val: any) => ({ key: val.id, ...val })) || [])
      }
    } catch (error) {
      console.log('error', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        loading={loading}
      />
    </div>
  )
}
