'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/spinner'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return <Spinner label="" color="warning" />
  }

  return <>{children}</>
}

export default ProtectedRoute
