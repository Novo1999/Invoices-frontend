import { SignOutButton } from '@clerk/clerk-react'

const SidebarContainer = ({ children }) => {
  return (
    <div className='bg-indigo-700 py-2 md:p-0 flex justify-between items-center pr-2 sm:w-14 sm:min-h-full sm:top-0 sm:flex-col md:w-20 sm:fixed'>
      {children}
      <div className='bg-red-500 text-white w-fit p-4 rounded-full btn btn-error hover:bg-red-600 btn-xs place-content-center flex sm:hidden'>
        <SignOutButton />
      </div>
    </div>
  )
}
export default SidebarContainer
