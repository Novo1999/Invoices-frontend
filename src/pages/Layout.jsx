import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'

const Layout = () => {
  const { isDark } = useSelector((state) => state.theme)

  const darkGradient = isDark
    ? 'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r'
    : 'bg-gradient-to-t from-yellow-500 via-purple-500 to-blue-500'

  return (
    <div
      className={`py-4 ${darkGradient} min-h-screen fixed inset-0 overflow-y-scroll`}
    >
      <Sidebar />
      <Outlet />
    </div>
  )
}
export default Layout
