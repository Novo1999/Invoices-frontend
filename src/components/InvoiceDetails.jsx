import { invoices } from '../utils/mockInvoices'
import ItemRow from './ItemRow'

const testInvoice = invoices[0]
console.log(testInvoice)

const InvoiceDetails = () => {
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
  } = testInvoice

  return (
    <main className='container max-w-full flex justify-center p-4 rounded-lg relative shadow-lg flex-col invoice-details'>
      <div className='flex justify-between text-sm w-full'>
        <div>
          <h4># {id}</h4>
          <p>{project}</p>
        </div>
        <div className='text-end space-y-1'>
          <p>{street}</p>
          <p>{city}</p>
          <p>{postCode}</p>
          <p>{country}</p>
        </div>
      </div>
      <div className='flex flex-col mt-6 text-sm'>
        <div className='flex justify-between'>
          <div className='space-y-1'>
            <p>Invoice Date</p>
            <h4>{invoiceDate}</h4>
            <p>Payment Due</p>
            <h4>{due}</h4>
          </div>
          <div className='space-y-1 text-end'>
            <p>Bill to</p>
            <h4>{name}</h4>
            <p>{billToStreet}</p>
            <p>{billToCity}</p>
            <p>{billToPostCode}</p>
            <p>{billToCountry}</p>
          </div>
        </div>
        <div className='text-center'>
          <p>Send to</p>
          <p className='text-xl !text-black  text-center'>{email}</p>
        </div>
      </div>
      <section className='bg-gray-200 rounded-lg mt-4'>
        <div className='grid grid-cols-4 text-xs p-2'>
          <p>Item Name</p>
          <p>QTY</p>
          <p>Price</p>
          <p>Total</p>
        </div>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </section>
    </main>
  )
}
export default InvoiceDetails
