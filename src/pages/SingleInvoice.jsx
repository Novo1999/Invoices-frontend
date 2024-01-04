import { FaArrowLeft } from 'react-icons/fa6'
import { ImCross } from 'react-icons/im'
import { Link, useParams } from 'react-router-dom'
import InvoiceDetails from '../components/InvoiceDetails'
import StatusBlock from '../components/StatusBlock'
import { useGetInvoiceQuery } from '../features/invoicesApi/invoicesApi.js'

const SingleInvoice = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetInvoiceQuery(id)
  let content = null

  if (isLoading) {
    content = <span className='m-auto loading loading-bars loading-lg'></span>
  }

  if (!isLoading && isError) {
    content = (
      <div role='alert' className='alert alert-error flex justify-center'>
        <ImCross />
        <span>Error getting Invoice details!!!</span>
      </div>
    )
  }

  if (!isLoading && !isError && data[0]._id) {
    content = (
      <>
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
          <StatusBlock invoice={data[0]} />
        </section>
        <section className='mx-4'>
          <InvoiceDetails invoice={data[0]} />
        </section>
      </>
    )
  }

  return (
    <main className='flex flex-col gap-6 h-dvh xl:items-center'>{content}</main>
  )
}
export default SingleInvoice
