import { ImCross } from 'react-icons/im'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useGetInvoicesQuery } from '../features/invoicesApi/invoicesApi.js'
import { mode, open } from '../features/sidebar/sidebarSlice'
import Select from './Select.jsx'

const InvoicesHeader = () => {
  const { filterBy } = useSelector((state) => state.filter)
  const { data, isLoading, isError } = useGetInvoicesQuery()

  // getting filtered item count
  const filteredInvoicesCount = data?.filter(
    (item) => item.status === filterBy
  ).length

  const handleNewInvoiceClick = () => {
    dispatch(open())
    dispatch(mode({ mode: 'add', formValues: {} }))
  }

  const dispatch = useDispatch()

  let content = null

  if (isLoading) {
    content = <span className='loading loading-dots loading-sm'></span>
  }
  if (!isLoading && isError) {
    content = (
      <div role='alert' className='alert alert-error'>
        <ImCross />
        <span>Error getting Tasks!!!</span>
      </div>
    )
  }

  if (!isLoading && !isError && data.length === 0) {
    content = (
      <div>
        <h1 className='text-center font-semibold text-xl'>Invoices</h1>
        <p className='block sm:hidden'>No invoices</p>
        <p className='hidden sm:block'>There are no invoices</p>
      </div>
    )
  }
  if (!isLoading && !isError && data.length > 0) {
    content = (
      <div className='*:text-white'>
        <h1 className='font-semibold text-xl'>Invoices</h1>
        <p className='block sm:hidden'>
          {filteredInvoicesCount || data?.length} {filterBy}{' '}
          {filterBy === '' && 'total'} invoices
        </p>
        {filterBy !== '' && (
          <p className='hidden sm:block'>
            There are {filteredInvoicesCount} total
            {' ' + filterBy} invoices
          </p>
        )}
        {filterBy === '' && (
          <p className='hidden sm:block'>
            There are {data?.length} total invoices
          </p>
        )}
      </div>
    )
  }

  return (
    <div className='flex gap-4 items-center mt-4 mx-4 justify-between md:ml-10 lg:ml-5 xl:ml-7 font-poppins'>
      <div className='flex flex-col items-start sm:w-52'>{content}</div>
      <div className='flex gap-6 flex-col sm:flex-row'>
        {data?.length > 0 && <Select />}
        {/* add new invoice */}
        <button
          onClick={handleNewInvoiceClick}
          className='btn rounded-full bg-gradient-to-r from-rose-700 to-pink-600 text-white '
        >
          <span className='border border-white rounded-full p-1 text-lg'>
            <MdAddCircle />
          </span>
          New<span className='hidden sm:block'>Invoice</span>
        </button>
      </div>
    </div>
  )
}
export default InvoicesHeader
