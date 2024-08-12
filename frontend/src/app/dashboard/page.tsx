import Dashboard from '@/components/dashboard/dashboard'
import AuthProtectedRoute from '@/components/hoc/AuthProtectedRoute'
export const metadata = {
  title: 'RC:RP Dashboard - Openmp Việt Nam',
}

const index = () => {
  return (
    <AuthProtectedRoute>
      <Dashboard />
    </AuthProtectedRoute>
  )
}

export default index
