import CreateNew from '@/components/create-new'
import React from 'react'
import ProtectedRoute from '@/components/hoc/ProtectedRoute';

export const metadata = {
  title: 'RC:RP Create New - Openmp Việt Nam',
}

const index = () => {
  return (
    <ProtectedRoute>
      <CreateNew />
    </ProtectedRoute>
  )
}

export default index
