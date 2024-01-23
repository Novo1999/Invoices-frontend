import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const ItemListFieldRow = ({ index, label, inputName, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <fieldset className={`flex flex-col ${className} gap-4 mt-2 `}>
      <input
        className='input input-bordered w-full max-w-full bg-white rounded-md'
        {...register(`itemList.${index}.${inputName}`, {
          valueAsNumber: inputName !== 'itemName',
          required: `${label} cannot be empty`,
        })}
        type={inputName === 'itemName' ? 'text' : 'number'}
      />
      <ErrorMessage
        errors={errors}
        name={`itemList.${index}.${inputName}`}
        render={({ message }) => <p className='text-red-500'>{message}</p>}
      />
    </fieldset>
  )
}
export default ItemListFieldRow
