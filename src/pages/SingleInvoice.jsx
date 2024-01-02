import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import InvoiceDetails from '../components/InvoiceDetails'
import StatusBlock from '../components/StatusBlock'

const SingleInvoice = () => {
  return (
    <main className='flex flex-col gap-6 h-dvh xl:items-center'>
      <section className='container max-w-full flex justify-center relative'>
        <div
          className='flex left-4 top-4 
          sm:left-24 absolute items-center gap-2'
        >
          <Link to='/' className='btn btn-circle '>
            <FaArrowLeft />
          </Link>
          <p>Go Back</p>
        </div>
        <StatusBlock />
      </section>
      <section className='mx-4'>
        <InvoiceDetails />
      </section>
    </main>
  )
}
export default SingleInvoice
