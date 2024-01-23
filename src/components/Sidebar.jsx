import { createPortal } from 'react-dom'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import AddForm from './AddForm'
import DarkModeSwap from './DarkModeSwap'
import SidebarContainer from './SidebarContainer'
import { SignOutButton, UserButton } from '@clerk/clerk-react'
import { mode, open } from '../features/sidebar/sidebarSlice.js'
const Sidebar = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state) => state.theme)

  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-blue-500 to-blue-600'

  return (
    <>
      <SidebarContainer>
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            dispatch(open())
            dispatch(mode({ mode: 'add', formValues: {} }))
          }}
          className={`${darkGradient} p-4 size-fit text-white md:size-20 flex justify-center items-center md:text-2xl tooltip tooltip-right tooltip-bg-blue-300 cursor-pointer border border-white rounded-md`}
          data-tip='Add New'
        >
          <BsReverseLayoutTextSidebarReverse />
        </div>
        <picture className='relative flex gap-8 md:mb-3 md:right-1 items-center sm:flex-col min-[425px]:pl-2'>
          <span className='text-white'>
            <DarkModeSwap />
          </span>
          <div className='absolute right-12 w-[1px] h-full bg-white sm:hidden'></div>
          <UserButton afterSignOutUrl='/login' />
          <div className='bg-red-500 text-white w-fit p-3 rounded-full btn btn-error hover:bg-red-600 btn-xs place-content-center hidden sm:h-12 sm:flex whitespace-nowrap'>
            <SignOutButton />
          </div>
        </picture>
      </SidebarContainer>
      {createPortal(<AddForm />, document.body)}
    </>
  )
}
export default Sidebar
