const ItemRow = ({ item }) => {
  const { name, price, quantity } = item
  return (
    <div className='grid grid-cols-4 text-xs space-y-2 p-2 place-items-center text-black'>
      <h4>{name}</h4>
      <p>{quantity}</p>
      <p>$ {price}</p>
      <h4>$ {quantity * price}</h4>
    </div>
  )
}
export default ItemRow
