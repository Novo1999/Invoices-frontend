const ItemListHeader = ({ fieldsLength }) => {
  return (
    <div className='grid grid-cols-3 lg:grid-cols-6 *:text-lg *:relative *:top-4 mb-4'>
      <label className='sm:col-span-2' htmlFor='item-name'>
        Item Name
      </label>
      <label htmlFor='item-quantity'>Qty.</label>
      <label htmlFor='item-price'>Price</label>
      <label className='hidden lg:block ml-4' htmlFor='item-total-price'>
        Total
      </label>
      {fieldsLength !== 1 && (
        <label className='hidden lg:block ml-2' htmlFor='item-total-price'>
          Delete
        </label>
      )}
    </div>
  )
}
export default ItemListHeader
