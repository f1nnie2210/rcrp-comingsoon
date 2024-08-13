import CreateNew from '@/components/create-new'
import React from 'react'
import WithAdminAuth from '@/components/hoc/withAdminAuth';

export const metadata = {
  title: 'RC:RP Create New - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithAdminAuth>
      <CreateNew />
    </WithAdminAuth>
  )
}

export default index
