import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const DatePick = () => {
  const [value, setValue] = useState(new Date())

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Datepicker
        inputClassName='bg-indigo-900 h-12 w-48 text-lg border-2 border-indigo-400 p-4 rounded-lg text-white'
        primaryColor='indigo'
        placeholder='Invoice Date'
        value={value}
        useRange={false}
        onChange={handleValueChange}
        asSingle={true}
        displayFormat={'DD/MM/YYYY'}
      />
    </div>
  )
}

export default DatePick
