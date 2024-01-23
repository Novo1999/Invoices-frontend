import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import api from '../features/api/apiSlice.js'
import {
  useAddInvoiceMutation,
  useAddOrderMutation,
  useEditInvoiceMutation,
} from '../features/invoicesApi/invoicesApi.js'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { makeId } from '../utils/idMaker.js'
import { setFormWidth } from '../utils/setFormWidth'
import { useForm } from 'react-hook-form'

const defaultFormFieldInitializer = {
  itemList: [{ itemName: '', quantity: '', price: '' }],
}

export const useAddForm = () => {
  const {
    sidebarOpen,
    sidebarMode: { mode, formValues },
  } = useSelector((state) => state.sidebar)
  const { date } = useSelector((state) => state.date)
  const [addInvoice] = useAddInvoiceMutation()
  const [editInvoice] = useEditInvoiceMutation()
  const [addOrder] = useAddOrderMutation()
  const [delayedClass, setDelayedClass] = useState('')
  const { id } = useParams() || {}
  const { width } = useWindowDimensions()
  const dispatch = useDispatch()

  const methods = useForm({
    defaultValues: defaultFormFieldInitializer,
  })

  // pre filling the form before editing
  useEffect(() => {
    if (mode === 'edit') {
      methods.reset({
        ...formValues,
      })
    }

    // Reset the form explicitly for 'add' mode
    if (mode === 'add') {
      methods.reset()
    }
    if (!sidebarOpen) {
      methods.reset(defaultFormFieldInitializer)
    }
  }, [mode, methods, formValues, sidebarOpen, dispatch])

  useEffect(() => {
    // Set a timeout to apply the delayed class
    const timeoutId = setTimeout(
      () => {
        setDelayedClass(sidebarOpen ? 'p-5 transition-all' : '')
      },
      sidebarOpen ? 0 : 220
    )
    // Clear the timeout if the component unmounts or sidebarOpen changes
    return () => clearTimeout(timeoutId)
  }, [sidebarOpen])

  // framer
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

  // user cannot scroll when the sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    }
    if (!sidebarOpen) {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen, dispatch, mode, methods])

  // adding
  const onSubmit = (data) => {
    if (mode === 'add') {
      console.log(data)

      // adding the id from the invoices to the order array after adding an invoice
      addInvoice({
        ...data,
        date: moment(date).format('DD MMMM YYYY'),
        id: `#${makeId(6)}`,
      })
        .unwrap()
        .then((payload) => {
          addOrder({ data: payload.id }) // sending the new order ID after posting invoice

          // injecting the _id in the new order so user can click later to access them, without this, it would show undefined which should not happen
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
    // if edit mode, edit the invoice with the pre-filled form
    if (mode === 'edit' && id) {
      console.log(data)
      editInvoice({
        id,
        data: {
          ...data,
          date: moment(date).format('DD MMMM YYYY'),
        },
      })
    }
  }

  return { methods, delayedClass, sidebar, onSubmit }
}
