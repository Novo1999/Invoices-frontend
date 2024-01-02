import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import FormRow from './FormRow'
import ItemListField from './ItemListField'
import Overlay from './Overlay'

const AddForm = () => {
  const { sidebarOpen } = useSelector((state) => state.sidebar)
  const { onSubmit } = useForm()
  const [delayedClass, setDelayedClass] = useState('')

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
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(30px at 40px 40px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
      width: sidebarOpen ? 350 : 0,
    },
  }

  const handleSubmit = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Overlay />
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        ref={sidebarRef}
        className={`absolute top-0 bg-indigo-900 text-white ${delayedClass} min-h-full`}
      >
        <motion.form
          className='h-full overflow-y-auto'
          initial='closed'
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={sidebar}
        >
          <h1>Add New</h1>
          {/* bill from */}
          <p>Bill From</p>
          <FormRow label='Street Address' name='street' />
          <div className='flex justify-between'>
            <FormRow label='City' name='city' />
            <FormRow label='Post Code' name='postCode' />
            <FormRow label='Country' name='country' />
          </div>
          {/* bill to */}
          <p>Bill To</p>
          <div>
            <FormRow label="Client's Name" name='name' />
            <FormRow label="Client's Email" name='email' />
            <FormRow label='Street Address' name='street' />
          </div>
          <div className='flex justify-between'>
            <FormRow label='City' name='city' />
            <FormRow label='Post Code' name='postCode' />
            <FormRow label='Country' name='country' />
          </div>
          <div className='flex justify-between'>
            {/* <DatePicker />
        <PaymentTerms /> */}
          </div>
          <FormRow label='Project Description' name='project' />
          <p>Item List</p>
          <div className='grid grid-cols-4'>
            <label htmlFor='item-name'>Item Name</label>
            <label htmlFor='item-quantity'>Qty.</label>
            <label htmlFor='item-price'>Price</label>
            <label htmlFor='item-total-price'>Total</label>
          </div>
          <ItemListField />
        </motion.form>
      </motion.aside>
    </>
  )
}
export default AddForm
