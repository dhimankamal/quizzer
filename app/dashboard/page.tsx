'use client'

import { useProfileStore } from '@/lib/hooks/store'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import QuizTable from './components/QuizTable'
import cookie from 'js-cookie'
import Student from './components/Student'

export default function DashboardPage () {
  const router = useRouter()
  const { profile } = useProfileStore()

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center border-b-2 pb-4'>
        <h1 className='text-3xl font-bold capitalize'>{profile?.name || ''}</h1>
        <span className='capitalize'> {profile?.role || ''}</span>
        <Button
          type='primary'
          onClick={() => {
            cookie.remove('token')
            router.refresh()
          }}
          className='bg-red-500 hover:!bg-red-700 text-white'
        >
          Logout
        </Button>
      </div>

      {profile?.role === 'teacher' && (
        <>
          <div className='mt-6 border-b-2 pb-4 flex justify-between items-center'>
            <h2 className='text-xl font-bold'>Created Quiz</h2>
            <Button
              onClick={() => router.push('/dashboard/add')}
              className='bg-blue-600'
              type='primary'
              size='large'
            >
              Create new quiz
            </Button>
          </div>
          <QuizTable />
        </>
      )}
      {profile?.role === 'student' && <Student />}
    </div>
  )
}
