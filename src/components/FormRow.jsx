import { useForm } from 'react-hook-form'

const FormRow = ({ label, name }) => {
  const { register } = useForm()

  return (
    <fieldset>
      <label htmlFor={label}>{label}</label>
      <input
        className='input input-bordered w-full max-w-xs'
        type='text'
        {...register(name)}
      />
    </fieldset>
  )
}
export default FormRow
