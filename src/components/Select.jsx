import { useEffect, useRef, useState } from 'react'
import { LuArrowDownLeftFromCircle } from 'react-icons/lu'
import { filter } from '../features/filter/filterSlice.js'

import { useDispatch } from 'react-redux'
const optionStyle =
  'block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'

const btnStyle =
  'relative flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none mt-1'

const Select = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const handleFilter = (e) => {
    dispatch(filter(e.target.value))
    setIsOpen(false)
  }

  const filterRef = useRef(null)

  // closing dropdown on outside click
  const handleOutsideClick = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div ref={filterRef} className='relative inline-block'>
      <button onClick={() => setIsOpen(!isOpen)} className={btnStyle}>
        <div className='flex gap-4'>
          <p>Filter By Status</p>
          <span className='text-xl'>
            <LuArrowDownLeftFromCircle />
          </span>
        </div>
      </button>
      {isOpen && (
        <div
          onClick={handleFilter}
          className='absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 *:cursor-pointer'
        >
          <option value='' href='#' className={optionStyle}>
            Filter By Status
          </option>
          <option value='draft' href='#' className={optionStyle}>
            Draft
          </option>
          <option value='pending' href='#' className={optionStyle}>
            Pending
          </option>
          <option value='paid' href='#' className={optionStyle}>
            Paid
          </option>
        </div>
      )}
    </div>
  )
}
export default Select
