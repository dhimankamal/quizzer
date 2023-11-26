'use client'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()
  return (
    <main className='p-4 border flex-1 grid justify-center items-center'> 
      <div className='text-center lg:w-2/3 w-full mx-auto'>
        <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
          Welcome to quizzer
        </h1>
        <p className='mb-8 leading-relaxed'>
          This platform is a haven for students seeking an exciting quiz-taking
          experience and teachers looking to create captivating quizzes
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
            className='bg-blue-600'
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
