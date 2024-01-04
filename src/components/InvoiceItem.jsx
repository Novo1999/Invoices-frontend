import { Reorder } from 'framer-motion'
import { GrDrag } from 'react-icons/gr'
import Status from './Status.jsx'
import useWindowDimensions from '../hooks/useWindowDimensions.js'
import { useSelector } from 'react-redux'

const InvoiceItem = ({ isDragging, invoice, setIsDragging }) => {
  const { filterBy } = useSelector((state) => state.filter)
  const { width } = useWindowDimensions()
  const { _id, id, name, due, amount, status } = invoice || {}
  return (
    <Reorder.Item
      className='grid grid-cols-2 mx-4 xl:ml-12 mt-4 bg-[#3b82f6] md:ml-10 lg:ml-5 p-4 rounded-lg shadow-lg items-center'
      dragListener={isDragging}
      onDragStart={() => width < 768 && setIsDragging(true)}
      onDragEnd={() => width < 768 && setIsDragging(false)}
      value={id}
    >
      <div className='space-y-2 sm:grid sm:grid-cols-3 items-center'>
        <div>
          <span className='text-gray-200'># </span>
          <span className='font-bold'>{id}</span>
        </div>
        <p className='lg:col-span-1 text-xs'>Due {due}</p>
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
          <span
            onTouchStart={() => filterBy === '' && setIsDragging(true)}
            style={{ touchAction: 'none' }}
          >
            <GrDrag />
          </span>
        </div>

        <p className='hidden sm:block text-center font-semibold'>$ {amount}</p>
        <span
          onTouchStart={() => filterBy === '' && setIsDragging(true)}
          style={{ touchAction: 'none' }}
          className='absolute right-[150px] lg:right-[170px] hidden sm:block cursor-grab'
        >
          <GrDrag />
        </span>
        <Status id={_id} place='component' status={status} />
      </div>
    </Reorder.Item>
  )
}
export default InvoiceItem
