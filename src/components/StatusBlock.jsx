/* eslint-disable react/prop-types */
import { PAID, PENDING, DRAFT } from '../utils/constants.js'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useChangeInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} from '../features/invoicesApi/invoicesApi.js'
import ResButton from './ResButton'
import Status from './Status'
import { useDispatch, useSelector } from 'react-redux'
import api from '../features/api/apiSlice.js'
import { mode, open } from '../features/sidebar/sidebarSlice.js'
import { setDate } from '../features/date/dateSlice.js'

const StatusBlock = ({ invoice }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, id } = invoice
  const [changeInvoiceStatus] = useChangeInvoiceStatusMutation()
  const { id: routeId } = useParams()
  const [deleteInvoice] = useDeleteInvoiceMutation()
  const { billFrom, billTo, due, project, email, name, invoiceDate, items } =
    invoice
  const { isDark } = useSelector((state) => state.theme)
  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'

  const handleDelete = async () => {
    await deleteInvoice({ _id: routeId, id })
    dispatch(api.endpoints.deleteOrder.initiate({ id }))
    navigate('/')
  }

  const handleInvoiceStatus = async (status) => {
    changeInvoiceStatus({ id: routeId, data: { status } })
  }

  // getting data from the current invoice to place in the form
  const handleEdit = () => {
    dispatch(open())
    dispatch(
      mode({
        mode: 'edit',
        formValues: {
          street: billFrom.street,
          fromCity: billFrom.city,
          fromPostCode: billFrom.postCode,
          fromCountry: billFrom.country,
          name,
          email,
          clientStreet: billTo.street,
          toCity: billTo.city,
          toPostCode: billTo.postCode,
          toCountry: billTo.country,
          payment: due,
          project,
          itemList: items.map((item) => {
            return {
              ...item,
              itemName: item.name,
            }
          }),
        },
      })
    )
    // setting the date in date picker
    dispatch(
      setDate({
        startDate: invoiceDate.split('T')[0],
        endDate: invoiceDate.split('T')[0],
      })
    )
  }

  let button = null

  // dynamically creating buttons based on invoices status type
  if (status) {
    if (status === PENDING) {
      button = (
        <div className='flex gap-2'>
          <ResButton
            onClick={() => handleInvoiceStatus(DRAFT)}
            type='mark as draft'
          >
            Mark as Draft
          </ResButton>
          <ResButton
            onClick={() => handleInvoiceStatus(PAID)}
            type='mark as paid'
          >
            Mark as paid
          </ResButton>
        </div>
      )
    }
    if (status === PAID) {
      button = (
        <div className='flex gap-2'>
          <ResButton
            onClick={() => handleInvoiceStatus(DRAFT)}
            type='mark as draft'
          >
            Mark as Draft
          </ResButton>
          <ResButton
            onClick={() => handleInvoiceStatus(PENDING)}
            type='mark as pending'
          >
            Mark as Pending
          </ResButton>
        </div>
      )
    }
    if (status === DRAFT) {
      button = (
        <div className='flex gap-2'>
          <ResButton
            onClick={() => handleInvoiceStatus(PENDING)}
            type='mark as pending'
          >
            Mark as Pending
          </ResButton>
          <ResButton
            onClick={() => handleInvoiceStatus(PAID)}
            type='mark as paid'
          >
            Mark as Paid
          </ResButton>
        </div>
      )
    }
  }

  return (
    <section
      className={`flex w-full mx-4 shadow-lg p-4 flex-col ${darkGradient} sm:ml-24 sm:flex-row justify-between mt-20 rounded-lg xl:max-w-[58.5rem] 2xl:max-w-[71.5rem] bg-white`}
    >
      <div className='flex justify-between sm:gap-2 mb-2 items-center'>
        <p className='font-bold text-lg'>Status</p>
        <span>
          <Status place='not component' status={status} />
        </span>
      </div>
      <div className='grid grid-cols-2 sm:flex gap-2 items-center justify-between sm:justify-end sm:gap-4'>
        <ResButton onClick={handleEdit} type='edit'>
          Edit
        </ResButton>
        <ResButton onClick={handleDelete} type='delete'>
          Delete
        </ResButton>
        {button}
      </div>
    </section>
  )
}
export default StatusBlock
