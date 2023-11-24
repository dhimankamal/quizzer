import { Button, Table, TableColumnsType } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Student () {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const columns: TableColumnsType<any> = [
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
      title: 'Action',
      key: 'action',
      render: val => (
        <Button
          type='primary'
          onClick={() => router.push('/dashboard/' + val.id)}
          className='bg-blue-600'
        >
          Enter
        </Button>
      )
    }
  ]

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
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  )
}
