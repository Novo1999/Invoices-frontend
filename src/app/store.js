import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import api from '../features/api/apiSlice.js'
import filterReducer from '../features/filter/filterSlice.js'
import dateReducer from '../features/date/dateSlice.js'
import themeReducer from '../features/theme/themeSlice.js'

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    filter: filterReducer,
    date: dateReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

export default store
