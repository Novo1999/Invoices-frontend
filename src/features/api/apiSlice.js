import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_URL,
  // send auth token of the logged in user
  prepareHeaders: async (headers) => {
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
  refetchOnReconnect: true,
  baseQuery,
  endpoints: (builder) => ({}),
})

export default api
