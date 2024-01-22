import { Reorder } from 'framer-motion'
import { ImCross } from 'react-icons/im'
import InvoiceItem from '../components/InvoiceItem.jsx'
import InvoicesHeader from '../components/InvoicesHeader'
import { filterByStatus } from '../utils/filterByStatus.js'
import { useInvoices } from '../hooks/useInvoices.js'

const Invoices = () => {
  const {
    isLoading,
    isLoadingOrder,
    isError,
    isSuccess,
    invoices,
    handleReorder,
    items,
    isDragging,
    setIsDragging,
    filterBy,
    isOrderError,
    error,
  } = useInvoices()

  let content = null

  // show loading skeleton
  if (isLoading || isLoadingOrder) {
    content = Array.from({ length: 8 }, (_, i) => i).map((_, index) => (
      <div
        key={index}
        className='flex flex-col gap-4 w-full items-center justify-center mt-12 *:bg-gradient-to-r from-sky-400 to-cyan-300'
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
  if (
    !isLoading &&
    !isError &&
    isSuccess &&
    !isOrderError &&
    invoices.length > 0
  ) {
    content = (
      <Reorder.Group
        axis='y'
        values={items.map((item) => item?.id)} //passing the value of ids in an array so they are unique and reordering can happen
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
