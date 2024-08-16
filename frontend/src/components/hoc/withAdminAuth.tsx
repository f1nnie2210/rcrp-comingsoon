'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getToken } from '@/utils/tokenStorage'
import axiosInstance from '@/utils/axiosInstance'
import { Spinner } from '@nextui-org/spinner'

const WithAdminLevel = ({ children, requiredLevel }: { children: React.ReactNode, requiredLevel: number }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/login')
      return
    }

    const verifyAdmin = async () => {
      try {
        const response = await axiosInstance.get('/auth/user-info', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const user = response.data

        if (user.Admin < requiredLevel) {
          router.replace('/not-authorized')
        } else {
          setLoading(false)
        }
      } catch (error) {
        router.replace('/login')
      }
    }

    verifyAdmin()
  }, [router, requiredLevel])

  if (loading) {
    return <Spinner>Loading...</Spinner>
  }

  return <>{children}</>
}

export default WithAdminLevel