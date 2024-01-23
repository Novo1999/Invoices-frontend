import { useFormContext } from 'react-hook-form'

const PaymentTerms = () => {
  const { register } = useFormContext()
  return (
    <select
      {...register('payment', { valueAsNumber: true })}
      className='select select-bordered w-full max-w-xs text-black bg-white rounded-md'
      defaultValue={10}
    >
      <option value={10}>Net 10 days</option>
      <option value={15}>Net 15 days</option>
      <option value={30}>Net 30 days</option>
      <option value={60}>Net 60 days</option>
    </select>
  )
}

export default PaymentTerms
