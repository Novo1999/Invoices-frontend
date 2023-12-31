import { FaArrowRight, FaCircle } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { setStatusBallColor, setStatusColor } from '../utils/statusColor'

const Status = ({ status, place, id }) => {
  if (place === 'component') {
    return (
      <Link
        className={`${setStatusColor(
          status
        )} rounded-lg p-3 min-[325px]:ml-7 w-32 sm:w-full sm:ml-0 sm:flex gap-4 justify-center shadow-lg transition-colors items-center`}
        to={`/invoices/${id}`}
      >
        <button className='capitalize h-5 text-center flex gap-6 md:gap-4'>
          <span className={setStatusBallColor(status)}>
            <FaCircle />
          </span>
          <p className='text-sm font-semibold'>{status}</p>
        </button>
        {place === 'component' && (
          <span className='text-xs hidden sm:block'>
            <FaArrowRight />
          </span>
        )}
      </Link>
    )
  }

  if (place === 'not component') {
    return (
      <div
        className={`${setStatusColor(
          status
        )} rounded-lg p-3 min-[325px]:ml-7 w-32 sm:w-full sm:ml-0 sm:flex gap-4 justify-center shadow-lg transition-colors items-center`}
      >
        <button className='capitalize h-5 text-center flex gap-6 md:gap-4 cursor-default'>
          <span className={setStatusBallColor(status)}>
            <FaCircle />
          </span>
          <p className='text-sm font-semibold'>{status}</p>
        </button>
        {place === 'component' && (
          <span className='text-xs hidden sm:block'>
            <FaArrowRight />
          </span>
        )}
      </div>
    )
  }
}
export default Status
