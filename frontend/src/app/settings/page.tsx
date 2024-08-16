import React from 'react'
import Settings from '@/components/dashboard/settings'
import WithAuth from '@/components/hoc/withAuth'

export const metadata = {
  title: 'RC:RP Settings - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithAuth>
      <Settings />
    </WithAuth>
  )
}

export default index
