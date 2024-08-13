'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/spinner'

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (token) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [token, router])

  if (isLoading) {
    return <Spinner label="" color="warning" />
  }

  return <>{children}</>
}

export default RedirectIfAuthenticated