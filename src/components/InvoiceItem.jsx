import { Reorder, useDragControls } from 'framer-motion'
import { GrDrag } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import Status from './Status.jsx'

const InvoiceItem = ({ isDragging, invoice, setIsDragging }) => {
  const { filterBy } = useSelector((state) => state.filter)
  const { _id, id, name, due, amount, status } = invoice || {}
  const { isDark } = useSelector((state) => state.theme)
  const controls = useDragControls()

  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-sky-400 to-cyan-300'

  console.log(isDragging)

  return (
    <Reorder.Item
      dragControls={controls}
      dragTransition={{ bounceDamping: 30, bounceStiffness: 800 }}
      className={`grid grid-cols-2 mx-4 mt-4 ${darkGradient} lg:ml-5 font-poppins font-bold p-4 rounded-lg shadow-lg items-center w-fit sm:w-[38rem] lg:w-[43rem]`}
      drag={isDragging ? 'y' : false}
      onDragEnd={() => setIsDragging(false)}
      value={id}
    >
      <div className='space-y-2 sm:grid sm:grid-cols-3 items-center'>
        <div>
          <span className='text-gray-200'>{id[0]}</span>
          <span className='font-bold'>{id.slice(1)}</span>
        </div>
        <p className='lg:col-span-1 text-xs font-thin'>Due {due} days</p>
        <p className='block sm:hidden font-semibold'>$ {amount}</p>
        <p className='text-sm lg:text-base hidden sm:block text-end font-semibold'>
          {name}
        </p>
      </div>
      <div className='relative flex flex-col gap-4 sm:gap-0 sm:grid grid-cols-2 sm:items-center'>
        <div className='flex sm:hidden justify-end gap-4 items-center'>
          <p className='text-sm lg:text-base  text-end font-semibold'>
            {name}{' '}
          </p>
          {filterBy === '' && (
            <span
              onPointerDown={(e) => {
                controls.start(e)
                setIsDragging(true)
              }}
              onTouchEnd={() => setIsDragging(false)}
              style={{ touchAction: 'none' }}
            >
              <GrDrag />
            </span>
          )}
        </div>

        <p className='hidden sm:block text-center font-semibold'>$ {amount}</p>
        {filterBy === '' && (
          <span
            onPointerDown={(e) => {
              controls.start(e)
              setIsDragging(true)
            }}
            style={{ touchAction: 'none' }}
            className='absolute right-[165px] lg:right-[170px] xl:right-[180px] 2xl:right-42 hidden sm:block cursor-grab'
          >
            <GrDrag />
          </span>
        )}
        <Status id={_id} place='component' status={status} />
      </div>
    </Reorder.Item>
  )
}
export default InvoiceItem
