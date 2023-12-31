import { useState } from 'react'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'
import SidebarContainer from './SidebarContainer'
import DarkModeSwap from './DarkModeSwap'
const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className='bg-blue-400 p-4 size-fit rounded-r-xl text-white md:size-20 flex justify-center items-center md:text-2xl'>
        <BsReverseLayoutTextSidebarReverse />
      </div>
      <picture className='relative flex gap-8 md:mb-3 md:right-1 items-center min-[425px]:flex-col min-[425px]:pl-2'>
        <DarkModeSwap />
        <div className='absolute right-12 w-[1px] h-full bg-white min-[425px]:hidden'></div>
        <img
          className='rounded-lg md:size-12'
          src='https://i.pravatar.cc/30'
          alt='avatar'
        />
      </picture>
    </SidebarContainer>
  )
}
export default Sidebar
