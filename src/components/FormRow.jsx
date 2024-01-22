import { motion } from 'framer-motion'
import { emailRegex } from '../utils/constants.js'
import PaymentTerms from './PaymentTerms.jsx'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const FormRow = ({ label, name, className, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  // dynamically setting validation properties
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

  let formRow = null
  if (name === 'payment') {
    formRow = <PaymentTerms />
  } else {
    formRow = (
      <motion.fieldset
        className={`flex flex-col gap-4 ${className} mt-2 `}
        variants={variants}
      >
        <label className='text-xs sm:text-sm lg:text-base' htmlFor={label}>
          {label}
        </label>
        <input
          className={`input input-bordered w-full max-w-full`}
          type={type === 'number' ? 'number' : 'text'}
          {...register(name, setValidationProperties(name))}
        />
        <ErrorMessage errors={errors} name={name} />

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p>{message}</p>}
        />
      </motion.fieldset>
    )
  }

  return formRow
}
export default FormRow
