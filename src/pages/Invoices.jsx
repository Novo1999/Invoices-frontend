import { FaArrowRight, FaCircle } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import InvoicesHeader from '../components/InvoicesHeader'
import { invoices } from '../utils/mockInvoices'
import { setStatusBallColor, setStatusColor } from '../utils/statusColor'
console.log(invoices)

const Invoices = () => {
  return (
    // invoice parent
    <main className='min-[425px]:w-96 min-[425px]:ml-12 sm:w-[40rem] sm:ml-24 lg:w-fit lg:ml-32 xl:m-auto xl:px-20'>
      <InvoicesHeader />
      {invoices.map((invoice) => {
        const { id, amount, due, name, status } = invoice
        return (
          // invoice items
          <div
            className='grid grid-cols-2 mx-4 xl:ml-12 mt-4 bg-[#3b82f6] md:ml-10 lg:ml-5 p-4 rounded-lg shadow-lg items-center'
            key={id}
          >
            <div className='space-y-2 sm:grid sm:grid-cols-3 items-center'>
              <p className=''>
                <span className='text-gray-400'>#</span>
                {id}
              </p>
              <p className='lg:col-span-1 text-xs'>Due {due}</p>
              <p className='block sm:hidden'>$ {amount}</p>
              <p className='text-sm lg:text-base hidden sm:block text-end'>
                {name}
              </p>
            </div>
            <div className='flex flex-col gap-4 sm:gap-0 sm:grid grid-cols-2 sm:items-center'>
              <p className='text-sm lg:text-base block sm:hidden text-end'>
                {name}
              </p>
              <p className='hidden sm:block text-center'>$ {amount}</p>

              <div
                className={`${setStatusColor(
                  status
                )} rounded-lg p-3 min-[325px]:ml-7 w-32 sm:w-full sm:ml-0 sm:flex gap-4 justify-center items-center`}
              >
                <Link className='capitalize h-5 text-center flex gap-6 md:gap-4'>
                  <span className={setStatusBallColor(status)}>
                    <FaCircle />
                  </span>
                  <p className='text-sm'>{status}</p>
                </Link>
                <span className='text-xs hidden sm:block'>
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
export default Invoices
