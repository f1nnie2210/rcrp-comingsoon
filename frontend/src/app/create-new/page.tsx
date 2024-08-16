import CreateNew from '@/components/create-new'
import React from 'react'
import WithAdminLevel from '@/components/hoc/withAdminAuth';
import WithAuth from '@/components/hoc/withAuth';

export const metadata = {
  title: 'RC:RP Create New - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithAuth>
    <WithAdminLevel requiredLevel={8}>
      <CreateNew />
    </WithAdminLevel>
  </WithAuth>
  )
}

export default index
