import { FaArrowLeft } from 'react-icons/fa6'
import InvoiceDetails from '../components/InvoiceDetails'
import StatusBlock from '../components/StatusBlock'

const SingleInvoice = () => {
  return (
    <main className='flex flex-col gap-6'>
      <section className='container max-w-full flex justify-center relative'>
        <div
          className='flex left-4 top-4 
        min-[425px]:left-20 sm:left-24 absolute items-center gap-2'
        >
          <button className='btn btn-circle '>
            <FaArrowLeft />
          </button>
          <p>Go Back</p>
        </div>
        <StatusBlock />
      </section>
      <InvoiceDetails />
    </main>
  )
}
export default SingleInvoice
