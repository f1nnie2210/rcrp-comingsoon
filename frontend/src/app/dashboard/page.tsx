import Dashboard from '@/components/dashboard/dashboard'
import ProtectedRoute from '@/components/hoc/ProtectedRoute'
export const metadata = {
  title: 'RC:RP Dashboard - Openmp Việt Nam',
}

const index = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default index
