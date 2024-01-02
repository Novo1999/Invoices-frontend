const PaymentTerms = () => {
  return (
    <select className='select select-bordered w-full max-w-xs text-black'>
      <option disabled selected>
        Payment Terms
      </option>
      <option>Net 10 days</option>
      <option>Net 15 days</option>
      <option>Net 30 days</option>
      <option>Net 60 days</option>
    </select>
  )
}
export default PaymentTerms
