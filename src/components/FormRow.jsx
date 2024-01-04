import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { emailRegex } from '../utils/constants.js'

const FormRow = ({ label, name, className, type }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()
  console.log(errors)

  const setValidationProperties = (name) => {
    let validation = { required: true }
    if (name === 'name') {
      validation.maxLength = 20
    }
    if (name === 'email') {
      validation.pattern = emailRegex
    }
    return validation
  }

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
        type={type === 'number' ? 'number' : 'text'}
        {...register(name, setValidationProperties(name))}
      />
    </motion.fieldset>
  )
}
export default FormRow
