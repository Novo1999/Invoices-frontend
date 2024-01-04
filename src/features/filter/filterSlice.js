import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterBy: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filterBy = action.payload
    },
  },
})

export const { filter } = filterSlice.actions

export default filterSlice.reducer
