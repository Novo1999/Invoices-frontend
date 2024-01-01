import { MdAddCircle } from 'react-icons/md'
import { invoices } from '../utils/mockInvoices'

const InvoicesHeader = () => {
  return (
    <div className='flex flex-col items-center gap-4 mt-4 mx-4'>
      <div>
        <h1 className='text-center font-semibold text-4xl'>Invoices</h1>
        <p>There are {invoices.length} total invoices</p>
      </div>
      <select className='select select-bordered w-full max-w-xs' name='status'>
        <option value=''>Filter By Status</option>
        <option value='draft'>Draft</option>
        <option value='draft'>Pending</option>
        <option value='draft'>Paid</option>
      </select>
      <button className='btn'>
        <MdAddCircle /> New Invoice
      </button>
    </div>
  )
}
export default InvoicesHeader
