const ItemListHeader = () => {
  return (
    <div className='grid grid-cols-3 lg:grid-cols-6 *:text-lg *:relative *:top-4'>
      <label className='sm:col-span-2' htmlFor='item-name'>
        Item Name
      </label>
      <label htmlFor='item-quantity'>Qty.</label>
      <label htmlFor='item-price'>Price</label>
      <label className='hidden lg:block' htmlFor='item-total-price'>
        Total
      </label>
      <label className='hidden lg:block' htmlFor='item-total-price'>
        Delete
      </label>
    </div>
  )
}
export default ItemListHeader
