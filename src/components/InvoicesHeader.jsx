import { MdAddCircle } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { open } from '../features/sidebar/sidebarSlice'
import { useGetInvoicesQuery } from '../features/invoicesApi/invoicesApi.js'
import { FaCross } from 'react-icons/fa6'

const InvoicesHeader = () => {
  const { data, isLoading, isError, error } = useGetInvoicesQuery()
  const dispatch = useDispatch()

  let content = null

  if (isLoading) {
    content = <span className='loading loading-dots loading-sm'></span>
  }
  if (!isLoading && isError) {
    content = (
      <div role='alert' className='alert alert-error'>
        <FaCross />
        <span>Error! Task failed successfully.</span>
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
        <p className='block sm:hidden'>{data?.length} invoices</p>
        <p className='hidden sm:block'>
          There are {data?.length} total invoices
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
        >
          <option value=''>Filter By Status</option>
          <option value='draft'>Draft</option>
          <option value='draft'>Pending</option>
          <option value='draft'>Paid</option>
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
