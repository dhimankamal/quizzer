'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navlinks = [
  {
    name: 'Home',
    href: '/',
    id: 'home'
  },
  {
    name: 'Dasboard',
    href: '/dashboard',
    id: 'dasboard'
  }
]

export default function Navbar () {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <nav className='backdrop-blur-xl bg-brown-200/60  sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark::border-gray-600'>
        <div className='flex flex-wrap items-center justify-between mx-auto p-6 container'>
          <Link
            href='/'
            aria-label='Go to main page'
            onClick={() => setOpen(false)}
            className='flex items-center text-3xl justify-center font-bold'
          >
            Quizzer
          </Link>
          <div className='flex'>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark::text-gray-400 dark::hover:bg-gray-700 dark::focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
              onClick={() => setOpen(pre => !pre)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5'
                viewBox='0 0 18 15'
                fill='none'
              >
                <path
                  d='M16 0.5H2C1.44772 0.5 1 0.947715 1 1.5V4.5C1 5.05228 1.44772 5.5 2 5.5H16C16.5523 5.5 17 5.05228 17 4.5V1.5C17 0.947715 16.5523 0.5 16 0.5Z'
                  stroke='#222222'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 9.5H2C1.44772 9.5 1 9.94772 1 10.5V13.5C1 14.0523 1.44772 14.5 2 14.5H16C16.5523 14.5 17 14.0523 17 13.5V10.5C17 9.94772 16.5523 9.5 16 9.5Z'
                  stroke='#222222'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-brown-200 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-brown-200 dark::bg-gray-800 md:dark::bg-gray-900 dark::border-gray-700'>
              {navlinks.map(({ name, href, id }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark::hover:text-blue-500 dark::text-brown-200 dark::hover:bg-gray-700 dark::hover:text-brown-200 md:dark::hover:bg-transparent dark::border-gray-700'
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed top-0 bottom-0 z-10 w-full h-full backdrop-blur-xl bg-brown-200/60 grid place-content-center'
        >
          <ul className='text-center'>
            {navlinks.map(({ name, href, id }) => (
              <li key={id}>
                <Link
                  onClick={() => setOpen(false)}
                  href={href}
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark::hover:text-blue-500 dark::text-brown-200 dark::hover:bg-gray-700 dark::hover:text-brown-200 md:dark::hover:bg-transparent dark::border-gray-700'
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  )
}
