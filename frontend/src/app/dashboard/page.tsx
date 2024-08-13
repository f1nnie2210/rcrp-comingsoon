import Dashboard from '@/components/dashboard/dashboard'
import WithAuth from '@/components/hoc/withAuth' 
export const metadata = {
  title: 'RC:RP Dashboard - Openmp Việt Nam',
}

const index = () => {
  return (
    <WithAuth>
      <Dashboard />
    </WithAuth>
  )
}

export default index
