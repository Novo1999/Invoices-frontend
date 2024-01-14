/* eslint-disable react/prop-types */
import { PAID, PENDING, DRAFT } from '../utils/constants.js'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useChangeInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} from '../features/invoicesApi/invoicesApi.js'
import ResButton from './ResButton'
import Status from './Status'
import { useDispatch } from 'react-redux'
import api from '../features/api/apiSlice.js'

const StatusBlock = ({ invoice }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status, id } = invoice
  const [changeInvoiceStatus] = useChangeInvoiceStatusMutation()
  const { id: routeId } = useParams()
  const [deleteInvoice] = useDeleteInvoiceMutation()

  const handleDelete = async () => {
    await deleteInvoice({ _id: routeId, id })
    dispatch(api.endpoints.deleteOrder.initiate({ data: { id } }))
    navigate('/')
  }

  const handleInvoiceStatus = async (status) => {
    changeInvoiceStatus({ id: routeId, data: { status } })
  }

  let button = null

  // dynamically creating buttons based on invoices status type
  if (status) {
    if (status === PENDING) {
      button = (
        <div>
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
        <div>
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
        <div>
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
    <section className='flex w-full mx-4 shadow-lg p-4 flex-col sm:ml-24 sm:flex-row justify-between mt-20 rounded-lg xl:max-w-[54rem] 2xl:max-w-[67.5rem]'>
      <div className='flex gap-4 justify-center items-center mb-4'>
        <p className='text-gray-400 font-bold text-lg'>Status</p>
        <span>
          <Status place='not component' status={status} />
        </span>
      </div>
      <div className='flex justify-between sm:justify-end sm:gap-4'>
        <ResButton type='edit'>Edit</ResButton>
        <ResButton onClick={handleDelete} type='delete'>
          Delete
        </ResButton>
        {button}
      </div>
    </section>
  )
}
export default StatusBlock
