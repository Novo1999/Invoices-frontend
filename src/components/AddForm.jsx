import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import DatePick from './DatePicker'
import FormRow from './FormRow'
import ItemListField from './ItemListField'
import Overlay from './Overlay'
import PaymentTerms from './PaymentTerms'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { setFormWidth } from '../utils/setFormWidth'

const AddForm = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar)
  const { handleSubmit } = useForm()
  const [delayedClass, setDelayedClass] = useState('')
  const { width } = useWindowDimensions()

  const sidebarRef = useRef(null)
  useEffect(() => {
    // Set a timeout to apply the delayed class after 1 second
    const timeoutId = setTimeout(
      () => {
        setDelayedClass(sidebarOpen ? 'p-5 transition-all' : '')
      },
      sidebarOpen ? 0 : 220
    )

    // Clear the timeout if the component unmounts or sidebarOpen changes
    return () => clearTimeout(timeoutId)
  }, [sidebarOpen])

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        ease: 'linear',
        duration: 0.2,
        stiffness: 50,
        restDelta: 2,
      },
      maxHeight: 'calc(100vh - 40px)',
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
      width: setFormWidth(sidebarOpen, width),
    },
  }

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    }
    if (!sidebarOpen) {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  const onSubmit = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Overlay />
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        ref={sidebarRef}
        className={`absolute top-0 bg-slate-800 rounded-r-lg text-white ${delayedClass} min-h-full form-input`}
      >
        <motion.form
          className='h-full overflow-y-auto space-y-2 text-xs'
          initial='closed'
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={sidebar}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-2xl'>Add New</h1>
          {/* bill from */}
          <p className='text-lg font-bold text-purple-500'>Bill From</p>
          <FormRow label='Street Address' name='street' />
          <div className='flex justify-around gap-2'>
            <FormRow label='City' name='city' />
            <FormRow label='Post Code' name='postCode' />
            <FormRow label='Country' name='country' />
          </div>
          {/* bill to */}
          <p className='text-lg text-purple-400'>Bill To</p>
          <div>
            <FormRow label="Client's Name" name='name' />
            <FormRow label="Client's Email" name='email' />
            <FormRow label='Street Address' name='street' />
          </div>
          <div className='flex justify-between gap-2'>
            <FormRow label='City' name='city' />
            <FormRow label='Post Code' name='postCode' />
            <FormRow label='Country' name='country' />
          </div>
          <div className='flex justify-between items-center gap-4'>
            <div className='space-y-2 mt-2'>
              <label
                className='text-xs sm:text-sm lg:text-base'
                htmlFor='invoice date'
              >
                Invoice Date
              </label>
              <DatePick />
            </div>
            <div className='space-y-2 mt-2'>
              <label
                className='text-xs sm:text-sm lg:text-base'
                htmlFor='invoice date'
              >
                Payment Terms
              </label>
              <PaymentTerms />
            </div>
          </div>
          <FormRow label='Project Description' name='project' />
          <p className='text-xl'>Item List</p>
          <div className='grid grid-cols-3 lg:grid-cols-6 *:text-lg *:relative *:top-4'>
            <label className='sm:col-span-2' htmlFor='item-name'>
              Item Name
            </label>
            <label htmlFor='item-quantity'>Qty.</label>
            <label htmlFor='item-price'>Price</label>
            <label className='hidden lg:block' htmlFor='item-total-price'>
              Total
            </label>
            <label className='hidden lg:block' htmlFor='item-total-price'>
              Delete
            </label>
          </div>
          <ItemListField />
        </motion.form>
      </motion.aside>
    </>
  )
}
export default AddForm
