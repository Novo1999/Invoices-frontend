import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-tailwindcss-datepicker'
import { setDate } from '../features/date/dateSlice.js'

const DatePick = () => {
  const { date } = useSelector((state) => state.date)
  const {
    sidebarMode: { mode },
  } = useSelector((state) => state.sidebar)

  const [value, setValue] = useState(new Date())
  const dispatch = useDispatch()
  const handleValueChange = (newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (value) {
      dispatch(setDate(value.startDate))
    }
  }, [dispatch, value])

  return (
    <div>
      <DatePicker
        inputClassName='bg-indigo-900 h-12 w-48 text-lg border-2 border-indigo-400 p-4 rounded-lg text-white'
        primaryColor='indigo'
        placeholder='Invoice Date'
        value={mode === 'add' ? value : date} // if add mode, don't use any date value, if edit mode, use the date from the invoice
        useRange={false}
        onChange={handleValueChange}
        asSingle={true}
        displayFormat='DD/MM/YYYY'
      />
    </div>
  )
}

export default DatePick
