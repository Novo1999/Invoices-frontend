import { SignOutButton } from '@clerk/clerk-react'
import { useSelector } from 'react-redux'

const SidebarContainer = ({ children }) => {
  const { isDark } = useSelector((state) => state.theme)

  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-blue-500 to-blue-600'

  return (
    <div
      className={`bg-gradient-to-r ${darkGradient} py-2 md:p-0 flex justify-between items-center p-2 sm:w-14 sm:min-h-full sm:top-0 sm:flex-col md:w-20 sm:fixed`}
    >
      {children}
      <div className='bg-red-500 text-white w-fit p-4 rounded-full btn btn-error hover:bg-red-600 btn-xs place-content-center flex sm:hidden'>
        <SignOutButton />
      </div>
    </div>
  )
}
export default SidebarContainer
