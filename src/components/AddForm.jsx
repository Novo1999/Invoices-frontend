import { motion } from 'framer-motion'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddInvoiceMutation,
  useAddOrderMutation,
} from '../features/invoicesApi/invoicesApi.js'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { makeId } from '../utils/idMaker.js'
import { setFormWidth } from '../utils/setFormWidth'
import DatePick from './DatePicker'
import FormRow from './FormRow'
import ItemListField from './ItemListField'
import Overlay from './Overlay'
import api from '../features/api/apiSlice.js'

const AddForm = () => {
  const { date } = useSelector((state) => state.date)
  const [addInvoice] = useAddInvoiceMutation()
  const [addOrder] = useAddOrderMutation()
  const { sidebarOpen } = useSelector((state) => state.sidebar)
  const [delayedClass, setDelayedClass] = useState('')
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      itemList: [{ id: '', itemName: '', quantity: '', price: '' }],
    },
  })

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

  const onSubmit = (data) => {
    // adding the id from the invoices to the order array after adding an invoice
    addInvoice({
      ...data,
      date: moment(date).format('DD MMMM YYYY'),
      id: `#${makeId(6)}`,
    })
      .unwrap()
      .then((payload) => {
        addOrder({ data: payload.id }) // sending the new order ID after posting invoice
        // injecting the _id in the new order
        dispatch(
          api.util.updateQueryData('getInvoices', undefined, (draft) => {
            draft.map((invoice) => {
              if (invoice.id === payload.id) {
                invoice._id = payload._id
              }
              return invoice
            })
          })
        )
      })
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
            className='h-full space-y-2 text-xs overflow-y-auto scrollbar-hide'
            initial='closed'
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={sidebar}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h1 className='text-2xl'>Add New</h1>
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
            <div className='flex justify-center'>
              <input className='btn' type='submit' />
            </div>
          </motion.form>
        </FormProvider>
      </motion.aside>
    </section>
  )
}
export default AddForm
