import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  return (
    <div className='bg-gradient-to-t from-yellow-500 via-purple-500 to-blue-500 py-4 min-h-screen'>
      <Sidebar />
      <Outlet />
    </div>
  )
}
export default Layout
