import Dashboard from '@/components/dashboard/dashboard'
import WithTokenRefresh from '@/components/hoc/withTokenRefresh';

export const metadata = {
  title: 'RC:RP Dashboard - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithTokenRefresh>
      <Dashboard />
    </WithTokenRefresh>
  )
}

export default index
