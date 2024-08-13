/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/spinner'
import axiosInstance from '@/utils/axiosInstance'

const WithAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const response = await axiosInstance.get('/auth/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { Admin } = response.data
        if (Admin > 0) {
          setIsAdmin(true)
        } else {
          router.push('/access-denied')
        }
      } catch (error) {
        console.error('Admin authentication error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAuth()
  }, [router])

  if (loading) {
    return <Spinner label="" color="warning" />
  }

  return isAdmin ? <>{children}</> : null
}

export default WithAdminAuth