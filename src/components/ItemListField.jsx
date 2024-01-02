import { RiDeleteBin7Fill } from 'react-icons/ri'
import FormRow from './FormRow'

const ItemListField = () => {
  return (
    <div>
      <FormRow name='itemName' label='' />
      <FormRow name='quantity' label='' />
      <FormRow name='price' label='' />
      <p>$ 156.5</p>
      <button className='btn text-white btn-square btn-outline'>
        <RiDeleteBin7Fill />
      </button>
    </div>
  )
}
export default ItemListField
