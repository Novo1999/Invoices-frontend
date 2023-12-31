import { FaCircle } from 'react-icons/fa6'
import InvoicesHeader from '../components/InvoicesHeader'
import { invoices } from '../utils/mockInvoices'
import { setStatusBallColor, setStatusColor } from '../utils/statusColor'
console.log(invoices)

const Invoices = () => {
  return (
    <main>
      <InvoicesHeader />
      {invoices.map((invoice) => {
        const { id, amount, due, name, status } = invoice
        return (
          <div
            className='grid grid-cols-3 w-84 gap-10 mx-4 mt-4 bg-[#3b82f6] p-4 rounded-lg shadow-lg items-center'
            key={id}
          >
            <p className='hidden'>#{id}</p>
            <p className='hidden'>Due {due}</p>
            <p>{name}</p>
            <p>${amount}</p>
            <div className={`${setStatusColor(status)} rounded-lg p-3`}>
              <p className='capitalize text-center flex flex-col items-center'>
                <span className={setStatusBallColor(status)}>
                  <FaCircle />
                </span>
                {status}
              </p>
            </div>
          </div>
        )
      })}
    </main>
  )
}
export default Invoices
