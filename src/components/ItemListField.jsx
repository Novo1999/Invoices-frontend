import { RiDeleteBin7Fill } from 'react-icons/ri'
import { FiPlusSquare } from 'react-icons/fi'
import ItemListHeader from './ItemListHeader.jsx'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ItemListField = () => {
  const { register, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itemList',
  })

  const handleAppend = () => {
    append()
    const formContainer = document.querySelector('.form-input')
    setTimeout(() => {
      formContainer.scrollTo(0, formContainer.scrollHeight)
    }, 50)
  }

  return (
    <div className='space-y-2'>
      <ItemListHeader fieldsLength={fields.length} />
      {fields.map((item, index) => (
        <li
          className='grid grid-cols-3 lg:grid-cols-6 gap-2 items-center justify-center'
          key={item.id}
        >
          <fieldset className='flex flex-col col-span-2 gap-4 mt-2'>
            <input
              className='input input-bordered w-full max-w-full'
              {...register(`itemList.${index}.itemName`)}
              type='text'
            />
          </fieldset>
          <fieldset className='flex flex-col gap-4 mt-2'>
            <input
              className='input input-bordered w-full max-w-full'
              {...register(`itemList.${index}.quantity`)}
              type='number'
            />
          </fieldset>
          <fieldset className='flex flex-col gap-4 mt-2'>
            <input
              className='input input-bordered w-full max-w-full'
              {...register(`itemList.${index}.price`)}
              type='number'
            />
          </fieldset>
          <p className='hidden lg:block text-lg text-center mt-2 mb'>$ 156.5</p>
          <p className='text-lg block text-center lg:hidden'>Total: $ 156.5</p>
          {index !== 0 && (
            <button
              onClick={() => remove(index)}
              className='btn text-white btn-square sm:mt-2 btn-outline w-full text-xl lg:w-full lg:px-2 col-span-2 sm:col-span-1'
            >
              <RiDeleteBin7Fill />
              <span className='block lg:hidden'>Delete</span>
            </button>
          )}
        </li>
      ))}

      <button
        type='button'
        onClick={handleAppend}
        className='sm:hidden btn hover:bg-slate-300 hover:text-black text-white btn-square btn-outline w-full text-lg lg:text-xl'
      >
        <FiPlusSquare /> <span>Add</span>
        <span className='hidden lg:block'>new Item</span>
      </button>
      <button
        type='button'
        onClick={handleAppend}
        className='hidden hover:bg-slate-300 hover:text-black sm:flex rounded-full btn text-white btn-square btn-outline w-full text-lg lg:text-xl'
      >
        <FiPlusSquare /> Add New Item
      </button>
    </div>
  )
}
export default ItemListField
