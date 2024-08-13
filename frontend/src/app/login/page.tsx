import Login from '@/components/login'
import React from 'react'
import RedirectIfAuthenticated from '@/components/hoc/RedirectIfAuthenticated'

export const metadata = {
  title: 'RC:RP Login - Openmp Việt Nam',
}

const index = () => {
  return (
    <RedirectIfAuthenticated>
      <Login />
    </RedirectIfAuthenticated>
  )
}

export default index
