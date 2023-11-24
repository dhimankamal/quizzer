'use client'

import request from '@/lib/api/client'
import { useProfileStore } from '@/lib/hooks/store'
import React, { useEffect } from 'react'

export default function DashboardProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const { setProfile } = useProfileStore()

  useEffect(() => {
    const fetch = async () => {
      const res = await request.get('/profile')
      if (res.status === 200) {
        setProfile(res.data.user)
      }
      // add remove form cookie token if profile not get
    }
    fetch()
  }, [])
  return <>{children}</>
}
