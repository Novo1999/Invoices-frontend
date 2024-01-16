import { Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useSelector } from 'react-redux'
import InvoiceItem from '../components/InvoiceItem.jsx'
import InvoicesHeader from '../components/InvoicesHeader'
import {
  useGetInvoicesQuery,
  useGetOrdersOfInvoicesQuery,
  useReorderInvoicesMutation,
} from '../features/invoicesApi/invoicesApi.js'
import debouncedReorder from '../utils/debouncedReorder.js'
import { filterByStatus } from '../utils/filterByStatus.js'

const Invoices = () => {
  const { filterBy } = useSelector((state) => state.filter)
  const {
    data: invoices,
    isLoading,
    isError,
    error,
  } = useGetInvoicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const {
    data: invoicesOrder,
    isSuccess,
    isLoading: isLoadingOrder,
    isError: isOrderError,
  } = useGetOrdersOfInvoicesQuery()

  const [reorderInvoices] = useReorderInvoicesMutation()

  // state for reordering by dragging
  const [items, setItems] = useState([])
  // setting dragListener to true for mobile
  const [isDragging, setIsDragging] = useState(false)

  // prevent user from dragging the items when they filter by status
  useEffect(() => {
    if (filterBy !== '') setIsDragging(false)
    if (filterBy === '') setIsDragging(true)
  }, [filterBy])

  // set items when no loading or error state on mount
  useEffect(() => {
    if (!isLoading && !isError) {
      setItems(invoices)
    }
  }, [invoices, isLoading, isError])

  useEffect(() => {
    if (isSuccess) {
      setItems((current) =>
        invoicesOrder?.order.map((id) => {
          return current.find((item) => item.id === id)
        })
      )
    }
  }, [isSuccess, invoicesOrder])

  // this reorders the invoices
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

  if (isLoading || isLoadingOrder) {
    content = Array.from({ length: 10 }, (_, i) => i).map((_, index) => (
      <div
        key={index}
        className='flex flex-col gap-4 w-full items-center justify-center mt-12'
      >
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    ))
  }
  if (!isLoading && !isOrderError && isError) {
    content = (
      <div role='alert' className='alert alert-error'>
        <ImCross />
        <span>{error.status}</span>
      </div>
    )
  }

  if (
    !isLoading &&
    !isError &&
    !isOrderError &&
    isSuccess &&
    invoices.length === 0
  ) {
    content = (
      <div className='stack flex justify-center mt-10 relative z-0 sm:ml-8 lg:right-4 xl:ml-16 '>
        <div className='card shadow-md bg-primary text-primary-content'>
          <div className='card-body'>
            <h2 className='card-title'>You have no invoices</h2>
            <p>Click new invoice to create one.</p>
          </div>
        </div>
      </div>
    )
  }
  console.log(items)
  if (
    !isLoading &&
    !isError &&
    !isOrderError &&
    isSuccess &&
    invoices.length > 0
  ) {
    content = (
      <Reorder.Group
        axis='y'
        values={items.map((item) => item.id)} //passing the value of ids in an array so they are unique and reordering can happen
        onReorder={handleReorder}
        layoutScroll
      >
        {items
          .filter((item) => filterByStatus(filterBy, item))
          .map((invoice) => {
            return (
              // invoice items
              <InvoiceItem
                isDragging={isDragging}
                invoice={invoice}
                setIsDragging={setIsDragging}
                key={invoice.id}
              />
            )
          })}
      </Reorder.Group>
    )
  }

  return (
    // invoice parent
    <main className='min-[425px]:w-96 min-[425px]:ml-5 sm:w-[40rem] sm:ml-24 lg:w-fit lg:ml-52 xl:m-auto xl:px-20 pb-12 relative'>
      <InvoicesHeader />
      {content}
    </main>
  )
}
export default Invoices
