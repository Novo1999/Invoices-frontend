import moment from 'moment'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setDate } from '../features/date/dateSlice.js'
import { useGetInvoiceQuery } from '../features/invoicesApi/invoicesApi.js'

const DatePick = () => {
  const [localDate, setLocalDate] = useState(new Date())
  const dispatch = useDispatch()
  const { id } = useParams()

  const { data, isSuccess } = useGetInvoiceQuery(id)

  useEffect(() => {
    if (isSuccess) {
      setLocalDate(new Date(data[0].invoiceDate))
      const formattedDate = moment(localDate).format('YYYY-MM-DD')
      dispatch(setDate(formattedDate))
    }
  }, [data, dispatch, isSuccess])

  return (
    <DatePicker
      className='rounded-md p-4 cursor-pointer'
      dateFormat='MM-dd-yyyy'
      includeTimes={false}
      selected={localDate}
      onChange={(date) => {
        setLocalDate(date)
        const formattedDate = moment(date).format('YYYY-MM-DD')
        dispatch(setDate(formattedDate))
      }}
    />
  )
}

export default DatePick

// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import DatePicker from 'react-tailwindcss-datepicker'
// import { setDate } from '../features/date/dateSlice.js'

// const DatePick = () => {
//   const { date } = useSelector((state) => state.date)

//   const [value, setValue] = useState(new Date())
//   const dispatch = useDispatch()
//   const handleValueChange = (newValue) => {
//     setValue(newValue)
//   }
//   console.log(value)
//   useEffect(() => {
//     if (value) dispatch(setDate(value.startDate))
//   }, [dispatch, value])

//   return (
//     <div>
//       <DatePicker
//         inputClassName='bg-indigo-900 h-12 w-48 text-lg border-2 border-indigo-400 p-4 rounded-lg text-white'
//         primaryColor='white'
//         placeholder='Invoice Date'
//         value={value}
//         useRange={false}
//         onChange={handleValueChange}
//         asSingle={true}
//         displayFormat='DD/MM/YYYY'
//       />
//     </div>
//   )
// }

// export default DatePick
