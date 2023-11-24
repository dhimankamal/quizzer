'use client'

import { useProfileStore } from '@/lib/hooks/store'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function DashboardPage () {
  const router = useRouter()

  const { profile } = useProfileStore()

  useEffect(() => {
    console.log('profile', profile)
  }, [profile])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center border-b-2 pb-4'>
        <h1 className='text-3xl font-bold'> {profile?.name || ''}</h1>
        <span className='capitalize'> {profile?.role || ''}</span>
      </div>
      <div className='mt-6 border-b-2 pb-4 flex justify-between its'>
        <h2>Created quiz</h2>
        <Button
          onClick={() => router.push('/dashboard/add')}
          className='bg-blue-600'
          type='primary'
          size='large'
        >
          Create new quiz
        </Button>
      </div>
    </div>
  )
}
