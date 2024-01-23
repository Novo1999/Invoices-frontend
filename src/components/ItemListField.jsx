import { RiDeleteBin7Fill } from 'react-icons/ri'
import { FiPlusSquare } from 'react-icons/fi'
import ItemListHeader from './ItemListHeader.jsx'
import { useFieldArray, useFormContext } from 'react-hook-form'
import ItemListFieldRow from './ItemListFieldRow.jsx'

const ItemListField = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itemList',
  })

  console.log(errors)

  const formFields = watch().itemList

  // check if last field has value and render the add new item button only if it does
  const lastField = (formFields && formFields[formFields.length - 1]) || {}
  let lastFieldHasValue = null
  if (
    lastField?.itemName?.length > 0 &&
    lastField?.quantity &&
    lastField?.price
  ) {
    lastFieldHasValue = true
  }
  // append the field
  const handleAppend = () => {
    append()
    // scroll to the bottom right after new field is added
    const formContainer = document.querySelector('.form-input')
    setTimeout(() => {
      formContainer.scrollTo({
        bottom: 0,
        top: formContainer.scrollHeight,
        behavior: 'smooth',
      })
    }, 50)
  }
  return (
    <div className='space-y-2'>
      <ItemListHeader fieldsLength={fields.length} />
      {fields.map((item, index) => (
        <li
          className='grid grid-cols-3 lg:grid-cols-6 gap-2 justify-center pb-6'
          key={item.id}
        >
          <ItemListFieldRow
            register={register}
            index={index}
            inputName='itemName'
            label='Item Name'
            className='col-span-2'
          />
          <ItemListFieldRow
            register={register}
            index={index}
            label='Item quantity'
            inputName='quantity'
          />
          <ItemListFieldRow
            register={register}
            index={index}
            label='Item Price'
            inputName='price'
          />
          <p className='hidden lg:block text-lg text-center mt-2 mb'>
            $ {formFields[index]?.quantity * formFields[index]?.price || 0}
          </p>
          <p className='text-lg block text-center lg:hidden'>
            Total: ${' '}
            {formFields[index]?.quantity * formFields[index]?.price || 0}
          </p>
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

      {lastFieldHasValue && (
        <>
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
        </>
      )}
    </div>
  )
}
export default ItemListField
