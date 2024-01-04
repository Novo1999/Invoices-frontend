import { ImCross } from 'react-icons/im'
import { MdAddCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useGetInvoicesQuery } from '../features/invoicesApi/invoicesApi.js'
import { open } from '../features/sidebar/sidebarSlice'
import { filter } from '../features/filter/filterSlice.js'

const InvoicesHeader = () => {
  const { filterBy } = useSelector((state) => state.filter)
  const { data, isLoading, isError } = useGetInvoicesQuery()
  // getting filtered item count
  const filteredInvoicesCount = data?.filter(
    (item) => item.status === filterBy
  ).length
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
      <>
        <h1 className='text-center font-semibold text-xl'>Invoices</h1>
        <p className='block sm:hidden'>
          {filteredInvoicesCount || data?.length} {filterBy}{' '}
          {filterBy === '' && 'total'} invoices
        </p>
        <p className='hidden sm:block'>
          There are {filteredInvoicesCount || data?.length} total
          {' ' + filterBy} invoices
        </p>
      </>
    )
  }

  return (
    <div className='flex gap-4 mt-4 mx-4 justify-between md:ml-10 lg:ml-5 xl:ml-12'>
      <div className='flex flex-col items-start  sm:w-52'>{content}</div>
      <div className='flex gap-6'>
        <select
          className='select select-bordered w-full max-w-xs'
          name='status'
          defaultValue={filterBy}
          onChange={(e) => dispatch(filter(e.target.value))}
        >
          <option value=''>Filter By Status</option>
          <option value='draft'>Draft</option>
          <option value='pending'>Pending</option>
          <option value='paid'>Paid</option>
        </select>
        {/* add new invoice */}
        <button
          onClick={() => dispatch(open())}
          className='btn rounded-full bg-purple-600 text-white hover:bg-purple-800'
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
