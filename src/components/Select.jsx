import { useEffect, useRef, useState } from 'react'
import { LuArrowDownLeftFromCircle } from 'react-icons/lu'
import { filter } from '../features/filter/filterSlice.js'

import { useDispatch, useSelector } from 'react-redux'
import { styleBtn, styleOption } from '../utils/styleBtn.js'

const Select = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { isDark } = useSelector((state) => state.theme)
  const btnStyle = styleBtn(isDark)
  const optionStyle = styleOption(isDark)

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
          <option value='' className={optionStyle}>
            Filter By Status
          </option>
          <option value='draft' className={optionStyle}>
            Draft
          </option>
          <option value='pending' className={optionStyle}>
            Pending
          </option>
          <option value='paid' className={optionStyle}>
            Paid
          </option>
        </div>
      )}
    </div>
  )
}
export default Select
