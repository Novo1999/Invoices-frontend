import { createSlice } from '@reduxjs/toolkit'

let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0')
let yyyy = today.getFullYear()

today = mm + '-' + dd + '-' + yyyy

const initialState = {
  date: today,
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload
    },
  },
})

export const { setDate } = dateSlice.actions

export default dateSlice.reducer
