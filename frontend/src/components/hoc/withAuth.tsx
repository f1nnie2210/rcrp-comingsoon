/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/spinner'
import axiosInstance from '@/utils/axiosInstance'

const WithAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  
    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }
  
        try {
          await axiosInstance.get('/auth/user-info', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Authentication error:', error)
          router.push('/login')
        } finally {
          setLoading(false)
        }
      }
  
      checkAuth()
    }, [router])
  
    if (loading) {
      return <Spinner label="" color="warning" />
    }
  
    return isAuthenticated ? <>{children}</> : null
  }
  
  export default WithAuth