/* eslint-disable react/prop-types */
import ItemRow from './ItemRow'

const InvoiceDetails = ({ invoice }) => {
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
    <main className='max-w-full xl:max-w-fit flex justify-center p-4 rounded-lg relative shadow-lg flex-col invoice-details sm:ml-20'>
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
        <div className='flex justify-between sm:w-[21rem] lg:w-[30rem] xl:w-[42rem] 2xl:w-[55rem]'>
          <div className='space-y-1'>
            <p>Invoice Date</p>
            <h4>{invoiceDate}</h4>
            <p>Payment Due</p>
            <h4>{due}</h4>
          </div>
          <div className='space-y-1 text-end sm:text-start xl:mr-48 2xl:mr-72'>
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
          <p className='text-xl !text-black text-center'>{email}</p>
        </div>
      </div>
      <section className='bg-gray-200 rounded-t-xl mt-4 p-4'>
        <div className='grid grid-cols-4 text-xs lg:text-lg p-2 place-items-center'>
          <p>Item Name</p>
          <p>QTY</p>
          <p>Price</p>
          <p>Total</p>
        </div>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </section>
      <div className='flex justify-around h-40 lg:text-lg items-center bg-indigo-900 rounded-b-xl '>
        <p className='!text-white'>Amount Due</p>
        <p className='!text-white'>
          $ {items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
        </p>
      </div>
    </main>
  )
}
export default InvoiceDetails
