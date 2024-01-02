import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    open: (state) => void (state.sidebarOpen = true),
    close: (state) => void (state.sidebarOpen = false),
  },
})

export const { open, close } = sidebarSlice.actions

export default sidebarSlice.reducer
