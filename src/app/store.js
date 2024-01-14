import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import api from '../features/api/apiSlice.js'
import filterReducer from '../features/filter/filterSlice.js'
import dateReducer from '../features/date/dateSlice.js'

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    filter: filterReducer,
    date: dateReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

export default store
