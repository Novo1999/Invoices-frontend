import { RiDeleteBin7Fill } from 'react-icons/ri'
import FormRow from './FormRow'
import { FiPlusSquare } from 'react-icons/fi'
import { useState } from 'react'

const ItemListField = () => {
  const [currentFields, setCurrentFields] = useState(1)

  const handleAddNewItemField = () => {
    setCurrentFields((current) => current + 1)
  }

  const arrayFromCurrentFields = Array.from(
    { length: currentFields },
    (_, i) => i + 1
  ).map((v) => v)

  return (
    <>
      {arrayFromCurrentFields.map((value) => {
        return (
          <div
            key={value}
            className='grid grid-cols-3 lg:grid-cols-6 gap-2 items-center justify-center'
          >
            <FormRow className='sm:col-span-2' name='itemName' label='' />
            <FormRow name='quantity' label='' />
            <FormRow name='price' label='' />
            <p className='hidden lg:block text-lg mt-6'>$ 156.5</p>
            <p className='text-lg block lg:hidden'>Total: $ 156.5</p>
            <button className='btn text-white btn-square sm:mt-7 btn-outline w-full text-xl lg:w-full lg:px-2 col-span-2 sm:col-span-1'>
              <RiDeleteBin7Fill />
              <span className='block lg:hidden'>Delete</span>
            </button>
          </div>
        )
      })}
      <button
        type='button'
        onClick={handleAddNewItemField}
        className='sm:hidden  btn text-white btn-square btn-outline w-full text-lg lg:text-xl'
      >
        <FiPlusSquare /> <span>Add</span>
        <span className='hidden lg:block'>new Item</span>
      </button>
      <button
        type='button'
        onClick={handleAddNewItemField}
        className='hidden sm:flex rounded-full btn text-white btn-square btn-outline w-full text-lg lg:text-xl'
      >
        <FiPlusSquare /> Add New Item
      </button>
    </>
  )
}
export default ItemListField
