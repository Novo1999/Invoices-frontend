import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  sidebarMode: {
    mode: 'add',
    formValues: {},
  },
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    open: (state) => void (state.sidebarOpen = true),
    close: (state) => void (state.sidebarOpen = false),
    mode: (state, action) => {
      state.sidebarMode.mode = action.payload.mode
      state.sidebarMode.formValues = action.payload.formValues
    },
  },
})

export const { open, close, mode } = sidebarSlice.actions

export default sidebarSlice.reducer
