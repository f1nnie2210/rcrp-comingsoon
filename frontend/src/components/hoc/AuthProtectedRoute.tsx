'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  return token ? <>{children}</> : null
}

export default AuthProtectedRoute
