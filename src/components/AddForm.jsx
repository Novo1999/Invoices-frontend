import { motion } from 'framer-motion'
import { FormProvider } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useAddForm } from '../hooks/useAddForm.js'
import DatePick from './DatePicker'
import FormRow from './FormRow'
import ItemListField from './ItemListField'
import Overlay from './Overlay'
import { RxCross2 } from 'react-icons/rx'
import { close } from '../features/sidebar/sidebarSlice.js'

const AddForm = () => {
  const {
    sidebarOpen,
    sidebarMode: { mode },
  } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()

  const { methods, delayedClass, sidebar, onSubmit } = useAddForm()

  const closeSidebar = () => {
    dispatch(close())
  }

  return (
    <section>
      <Overlay />
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        className={`absolute top-0 bg-slate-800 rounded-r-lg text-white ${delayedClass} min-h-full form-input`}
      >
        <FormProvider {...methods}>
          <motion.form
            className='h-full space-y-2 text-xs relative overflow-y-auto scrollbar-hide'
            initial='closed'
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={sidebar}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div
              onClick={closeSidebar}
              className='absolute right-1 text-3xl top-3 cursor-pointer'
            >
              <RxCross2 />
            </div>
            <h1 className='text-2xl'>
              {mode === 'add' ? 'Add New' : 'Edit Form'}
            </h1>
            {/* bill from */}
            <p className='text-lg font-bold text-purple-500'>Bill From</p>
            <FormRow label='Street Address' name='street' />
            <div className='flex justify-around gap-2'>
              <FormRow label='City' name='fromCity' />
              <FormRow label='Post Code' name='fromPostCode' />
              <FormRow label='Country' name='fromCountry' />
            </div>
            {/* bill to */}
            <p className='text-lg text-purple-400'>Bill To</p>
            <div>
              <FormRow label="Client's Name" name='name' />
              <FormRow label="Client's Email" name='email' />
              <FormRow label='Street Address' name='clientStreet' />
            </div>
            <div className='flex justify-between gap-2'>
              <FormRow label='City' name='toCity' />
              <FormRow label='Post Code' name='toPostCode' />
              <FormRow label='Country' name='toCountry' />
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
              <div className='mt-2 space-y-2'>
                <label
                  className='text-xs sm:text-sm lg:text-base'
                  htmlFor='invoice date'
                >
                  Payment Terms
                </label>
                <FormRow name='payment' />
              </div>
            </div>
            <FormRow label='Project Description' name='project' />
            <p className='text-2xl font-semibold'>Item List</p>
            <ItemListField />
            <div className='flex justify-center '>
              <input
                className='btn bg-white rounded-md hover:text-white hover:bg-red-500'
                type='submit'
              />
            </div>
          </motion.form>
        </FormProvider>
      </motion.aside>
    </section>
  )
}
export default AddForm
