import { createPortal } from 'react-dom'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import AddForm from './AddForm'
import DarkModeSwap from './DarkModeSwap'
import SidebarContainer from './SidebarContainer'
import { SignOutButton, UserButton } from '@clerk/clerk-react'
const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar)

  return (
    <>
      <SidebarContainer>
        <div className='bg-blue-400 p-4 size-fit rounded-r-xl text-white md:size-20 flex justify-center items-center md:text-2xl'>
          <BsReverseLayoutTextSidebarReverse />
        </div>
        <picture className='relative flex gap-8 md:mb-3 md:right-1 items-center sm:flex-col min-[425px]:pl-2'>
          <DarkModeSwap />
          <div className='absolute right-12 w-[1px] h-full bg-white sm:hidden'></div>
          <UserButton />
          <div className='bg-red-500 text-white w-fit p-4 rounded-full btn btn-error hover:bg-red-600 btn-xs place-content-center hidden sm:h-12 sm:flex whitespace-nowrap'>
            <SignOutButton />
          </div>
        </picture>
      </SidebarContainer>
      {createPortal(<AddForm />, document.body)}
    </>
  )
}
export default Sidebar
