const SidebarContainer = ({ children }) => {
  return (
    <div className='bg-[#3b37c9] py-2 md:p-0 flex justify-between items-center pr-2 min-[425px]:w-14 min-[425px]:min-h-full min-[425px]:top-0 min-[425px]:flex-col md:w-20 min-[425px]:fixed '>
      {children}
    </div>
  )
}
export default SidebarContainer
