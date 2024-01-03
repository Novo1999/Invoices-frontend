import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_URL,
  // send auth token of the logged in user
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = await window.Clerk.session.getToken({
      template: import.meta.env.VITE_APP_TOKEN_TEMPLATE,
    })
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({}),
})

export default api
