import Login from '@/components/login'
import React from 'react'
import WithTokenRefresh from '@/components/hoc/withTokenRefresh'
import WithAuthRedirect from '@/components/hoc/withAuthRedirect'

export const metadata = {
  title: 'RC:RP Login - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithAuthRedirect>
      <>
        <Login />
      </>
    </WithAuthRedirect>
  )
}

export default index
