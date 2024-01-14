const ItemListFieldRow = ({ register, index, inputName, className }) => {
  return (
    <fieldset className={`flex flex-col ${className} gap-4 mt-2`}>
      <input
        className='input input-bordered w-full max-w-full'
        {...register(`itemList.${index}.${inputName}`, {
          valueAsNumber: inputName !== 'itemName',
          required: true,
        })}
        type={inputName === 'itemName' ? 'text' : 'number'}
      />
    </fieldset>
  )
}
export default ItemListFieldRow
