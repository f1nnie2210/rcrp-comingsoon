'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/spinner'
import axios from 'axios'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5000/api/auth/user-info',
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          )
          const { Admin } = response.data
          setIsAdmin(Admin > 0)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching user info:', error)
          setIsAdmin(false)
          setLoading(false)
        }
      }

      fetchUserInfo()
    }
  }, [router])

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/...not-found')
    }
  }, [isAdmin, router])

  if (loading) {
    return <Spinner label="" color="warning" />
  }

  return isAdmin ? <>{children}</> : null
}

export default ProtectedRoute