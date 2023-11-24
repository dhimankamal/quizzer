import React from 'react'
import DashboardProvider from './components/Provider'

export default function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardProvider>{children}</DashboardProvider>
    </>
  )
}
