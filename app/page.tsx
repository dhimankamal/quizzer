'use client'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()
  return (
    <main className='p-4 border flex-1 grid justify-center items-center'> 
      <div className='text-center lg:w-2/3 w-full mx-auto'>
        <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
          Welcome to Quizzer
        </h1>
        <p className='mb-8 leading-relaxed'>
          Quizzer provides functionality for Teachers to create Muliple Choice Questions, which Students can attempt to check their knowledge ability. This project is submitted to <span className='font-bold'>Dr. Amandeep Verma</span> Dept. Of Computer Science. This Project created  by <span className='font-bold'>Taranpreet Singh</span> (21271545) and <span className='font-bold'>Naresh Kumar</span> (21271548). 
        </p>
        <div className='flex justify-center gap-4'>
          <Button
            type='primary'
            className='bg-blue-600'
            onClick={() => router.push('/auth/login')}
          >
            {' '}
            Login{' '}
          </Button>

          <Button
            type='primary'
            className='bg-gray-100 text-black hover:!bg-blue-600'
            onClick={() => router.push('/auth/register')}
          >
            {' '}
            Register{' '}
          </Button>
        </div>
      </div>
    </main>
  )
}
