import InvoicesHeader from '../components/InvoicesHeader'
import Status from '../components/Status'
import { invoices } from '../utils/mockInvoices'

const Invoices = () => {
  return (
    // invoice parent
    <main className='min-[425px]:w-96 min-[425px]:ml-12 sm:w-[40rem] sm:ml-24 lg:w-fit lg:ml-40 xl:m-auto xl:px-20'>
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
                <span className='text-gray-200'># </span>
                <span className='font-bold'>{id}</span>
              </p>
              <p className='lg:col-span-1 text-xs'>Due {due}</p>
              <p className='block sm:hidden font-semibold'>$ {amount}</p>
              <p className='text-sm lg:text-base hidden sm:block text-end font-semibold'>
                {name}
              </p>
            </div>
            <div className='flex flex-col gap-4 sm:gap-0 sm:grid grid-cols-2 sm:items-center'>
              <p className='text-sm lg:text-base block sm:hidden text-end font-semibold'>
                {name}
              </p>
              <p className='hidden sm:block text-center font-semibold'>
                $ {amount}
              </p>
              <Status place='component' status={status} />
            </div>
          </div>
        )
      })}
    </main>
  )
}
export default Invoices
