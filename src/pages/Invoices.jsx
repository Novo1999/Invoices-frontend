import { Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import InvoicesHeader from '../components/InvoicesHeader'
import useWindowDimensions from '../hooks/useWindowDimensions'
import {
  useGetInvoicesQuery,
  useGetOrdersOfInvoicesQuery,
  useReorderInvoicesMutation,
} from '../features/invoicesApi/invoicesApi.js'
import { FaCross } from 'react-icons/fa6'
import debouncedReorder from '../utils/deboouncedReorder.js'
import InvoiceItem from '../components/InvoiceItem.jsx'

const Invoices = () => {
  const { data, isLoading, isError, error } = useGetInvoicesQuery()
  const { data: invoicesOrder, isSuccess } = useGetOrdersOfInvoicesQuery()

  const [reorderInvoices] = useReorderInvoicesMutation()

  // state for reordering by dragging
  const [items, setItems] = useState([])
  // setting dragListener to true for mobile
  const [isDragging, setIsDragging] = useState(false)
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (!isLoading && !isError) setItems(data)
  }, [data, isLoading, isError])

  useEffect(() => {
    // let the user drag when they are on pc
    if (width > 768) setIsDragging(true)
  }, [width])

  useEffect(() => {
    if (isSuccess) {
      setItems((current) =>
        invoicesOrder.order?.map((id) => {
          return current.find((item) => item.id === id)
        })
      )
    }
  }, [isSuccess, invoicesOrder])

  const handleReorder = (reorderedIds) => {
    const reorderedInvoices = reorderedIds.map((id) =>
      items.find((invoice) => invoice.id === id)
    )
    setItems(reorderedInvoices)
    const reorderedInvoicesIds = reorderedInvoices.map((invoice) => invoice.id)

    // Cancel the previous debouncedReorder function
    debouncedReorder.cancel()

    // Call the debounced function
    debouncedReorder(reorderInvoices, reorderedInvoicesIds)
  }

  let content = null

  if (isLoading) {
    content = Array.from({ length: 10 }, (_, i) => i).map((_) => (
      <div
        key={crypto.randomUUID()}
        className='flex flex-col gap-4 w-full items-center justify-center mt-12'
      >
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    ))
  }
  if (!isLoading && isError) {
    content = (
      <div role='alert' className='alert alert-error'>
        <FaCross />
        <span>{error.status}</span>
      </div>
    )
  }

  if (!isLoading && !isError && data.length === 0) {
    content = (
      <div className='stack flex justify-center mt-10 relative z-0 sm:ml-8 lg:right-4 xl:ml-16'>
        <div className='card shadow-md bg-primary text-primary-content'>
          <div className='card-body'>
            <h2 className='card-title'>You have no invoices</h2>
            <p>Click new invoice to create one.</p>
          </div>
        </div>
      </div>
    )
  }
  if (!isLoading && !isError && isSuccess && data.length > 0) {
    content = (
      <Reorder.Group
        axis='y'
        values={items.map((item) => item?.id)} //passing the value of ids in an array so they are unique and dragging can happen
        onReorder={handleReorder}
      >
        {items.map((invoice) => {
          return (
            // invoice items
            <InvoiceItem
              isDragging={isDragging}
              invoice={invoice}
              setIsDragging={setIsDragging}
              key={invoice?.id || crypto.randomUUID()}
            />
          )
        })}
      </Reorder.Group>
    )
  }

  return (
    // invoice parent
    <main className='min-[425px]:w-96 min-[425px]:ml-5 sm:w-[40rem] sm:ml-24 lg:w-fit lg:ml-52 xl:m-auto xl:px-20 pb-12'>
      <InvoicesHeader />
      {content}
    </main>
  )
}
export default Invoices
