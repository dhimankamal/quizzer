'use client'

import request from '@/lib/api/client'
import { useProfileStore } from '@/lib/hooks/store'
import React, { useEffect } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function DashboardProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const { setProfile } = useProfileStore()
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await request.get('/profile')
        if (res.status === 200) {
          setProfile(res.data.user)
        } else {
          cookie.remove('token')
          router.refresh()
        }
      } catch (error) {
        cookie.remove('token')
        router.refresh()
      }
    }
    fetch()
  }, [])
  return <>{children}</>
}
