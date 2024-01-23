import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-tailwindcss-datepicker'
import { setDate } from '../features/date/dateSlice.js'

const DatePick = () => {
  const { date } = useSelector((state) => state.date)

  const [value, setValue] = useState(new Date())
  const dispatch = useDispatch()
  const handleValueChange = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(setDate(value.startDate))
  }, [dispatch, value])

  return (
    <div>
      <DatePicker
        inputClassName='bg-indigo-900 h-12 w-48 text-lg border-2 border-indigo-400 p-4 rounded-lg text-white'
        primaryColor='indigo'
        placeholder='Invoice Date'
        value={value}
        useRange={false}
        onChange={handleValueChange}
        asSingle={true}
        displayFormat='DD/MM/YYYY'
      />
    </div>
  )
}

export default DatePick
