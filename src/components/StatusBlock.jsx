import ResButton from './ResButton'
import Status from './Status'

const StatusBlock = ({ invoice }) => {
  const { status } = invoice
  return (
    <section className='flex w-full mx-4 shadow-lg p-4 flex-col sm:ml-24 sm:flex-row justify-between mt-20 rounded-lg xl:max-w-[54rem] 2xl:max-w-[67.5rem]'>
      <div className='flex gap-4 justify-center items-center mb-4'>
        <p className='text-gray-400 font-bold text-lg'>Status</p>
        <span>
          <Status place='not component' status={status} />
        </span>
      </div>
      <div className='flex justify-between sm:justify-end sm:gap-4'>
        <ResButton type='edit'>Edit</ResButton>
        <ResButton type='delete'>Delete</ResButton>
        <ResButton type='mark as paid'>Mark as Paid</ResButton>
      </div>
    </section>
  )
}
export default StatusBlock
