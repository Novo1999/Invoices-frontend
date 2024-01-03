import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import api from '../features/api/apiSlice.js'

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

export default store
