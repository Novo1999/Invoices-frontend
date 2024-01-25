/* eslint-disable react/prop-types */
import moment from 'moment'
import { useSelector } from 'react-redux'
import ItemRow from './ItemRow'

const InvoiceDetails = ({ invoice }) => {
  const { isDark } = useSelector((state) => state.theme)
  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
  const mainStyle = `max-w-full ${darkGradient} xl:max-w-fit flex justify-center p-4 rounded-lg relative shadow-lg flex-col sm:ml-20 bg-white`

  const {
    id,
    due,
    project,
    name,
    email,
    invoiceDate,
    billFrom: { city, street, postCode, country },
    billTo: {
      city: billToCity,
      country: billToCountry,
      postCode: billToPostCode,
      street: billToStreet,
    },
    items,
  } = invoice

  return (
    <main className={mainStyle}>
      <div className='flex justify-between text-sm lg:text-lg w-full'>
        <div>
          <h4 className='font-semibold'>{id}</h4>
          <p>{project}</p>
        </div>
        <div className='text-end space-y-1'>
          <p>{street}</p>
          <p>{city}</p>
          <p>{postCode}</p>
          <p>{country}</p>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row sm:justify-between mt-6 text-sm lg:text-lg'>
        <div className='flex justify-between lg:w-[30rem] xl:w-[45rem] 2xl:w-[58rem]'>
          <div className='space-y-1'>
            <p>Invoice Date</p>
            <h4>{moment(invoiceDate).format('DD-MM-YYYY')}</h4>
            <p>Payment Due</p>
            <h4>{due} days</h4>
          </div>
          <div className='space-y-1 text-end sm:text-start xl:mr-48'>
            <p>Bill to</p>
            <h4>{name}</h4>
            <p>{billToStreet}</p>
            <p>{billToCity}</p>
            <p>{billToPostCode}</p>
            <p>{billToCountry}</p>
          </div>
        </div>
        <div className='text-center md:text-start'>
          <p>Send to</p>
          <p className='text-xl  text-center'>{email}</p>
        </div>
      </div>
      <section className='bg-gray-200 rounded-t-xl mt-4 p-4'>
        <div className='grid grid-cols-4 text-xs lg:text-lg p-2 place-items-center text-black'>
          <p>Item Name</p>
          <p>QTY</p>
          <p>Price</p>
          <p>Total</p>
        </div>
        {items.map((item) => (
          <ItemRow key={item._id || crypto.randomUUID()} item={item} />
        ))}
      </section>
      <div className='flex justify-around h-40 lg:text-lg items-center bg-indigo-900 rounded-b-xl '>
        <p>Amount Due</p>
        <p>
          $ {items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
        </p>
      </div>
    </main>
  )
}
export default InvoiceDetails
