import { useDispatch, useSelector } from 'react-redux'
import { close } from '../features/sidebar/sidebarSlice'

const Overlay = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()
  return (
    sidebarOpen && (
      <div
        onClick={() => dispatch(close())}
        className='w-full h-screen bg-gray-500 bg-opacity-50 backdrop-blur-xs absolute top-0'
      ></div>
    )
  )
}

export default Overlay
