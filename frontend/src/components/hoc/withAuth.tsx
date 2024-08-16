'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/utils/tokenStorage'
import { Spinner } from '@nextui-org/spinner'

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/login')
    }
  }, [router])

  const token = getToken()
  if (!token) {
    return <Spinner>Loading...</Spinner>
  }

  return <>{children}</>
}

export default WithAuth