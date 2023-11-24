import { Table, TableColumnsType } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

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
    { title: 'Option1', dataIndex: 'option1', key: 'option1' },
    { title: 'Option2', dataIndex: 'option2', key: 'option2' },
    { title: 'Option3', dataIndex: 'option3', key: 'option3' },
    { title: 'Option4', dataIndex: 'option4', key: 'option4' },
    { title: 'Answer', dataIndex: 'answer', key: 'answer' }
  ]

  return (
    <Table
      columns={columns}
      dataSource={val.Questions || []}
      pagination={false}
    />
  )
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
  }
]

export default function QuizTable () {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/quiz')
      if (res.status === 200) {
        setData(res?.data.map((val: any) => ({ key: val.id, ...val })) || [])
      }
      console.log('res>>>', res.data)
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
