import { prisma } from '@/lib/db'
import dayjs from 'dayjs'
import React from 'react'
import Questions from './components/Questions'

//ssr render
const fetchQuiz: any = async (id: string) => {
  try {
    const res = await prisma.quiz.findUnique({
      where: { id },
      include: { Questions: true, user: true }
    })
    return res
  } catch (error) {
    return false
  }
}

export default async function QuizPage ({
  params
}: {
  params: { quizid: string }
}) {
  const data = await fetchQuiz(params.quizid)

  return (
    <section className='p-4 grid gap-4'>
      <ul className='flex  flex-wrap gap-10 bg-gray-100 p-4'>
        <li>
          <h2 className=' font-bold'>Quiz name</h2>
          <span>{data?.name}</span>
        </li>
        <li>
          <h2 className=' font-bold'>Created by</h2>
          <span>{data?.user?.name}</span>
        </li>
        <li>
          <h2 className=' font-bold'>Created Date</h2>
          <span>
            {dayjs(data?.createdAt).format('ddd, MMM D, YYYY h:mm A')}
          </span>
        </li>
      </ul>
      <Questions data={data} />
    </section>
  )
}
