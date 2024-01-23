import { createSlice } from '@reduxjs/toolkit'

const initialState = { isDark: JSON.parse(localStorage.getItem('isDark')) }

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.isDark = action.payload
    },
  },
})

export const { setDark } = themeSlice.actions

export default themeSlice.reducer
