import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

const FormRow = ({ label, name, className }) => {
  const { register, watch } = useForm()

  console.log(watch('itemName'))

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: 100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <motion.fieldset
      className={`flex flex-col gap-4 ${className} mt-2`}
      variants={variants}
    >
      <label className='text-xs sm:text-sm lg:text-base' htmlFor={label}>
        {label}
      </label>
      <input
        className={`input  input-bordered w-full max-w-full`}
        type='text'
        {...register(name)}
      />
    </motion.fieldset>
  )
}
export default FormRow
