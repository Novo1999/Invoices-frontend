import invoiceApi from '../api/apiSlice.js'

const invoicesApi = invoiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => '/',
    }),
  }),
})

export const { useGetInvoicesQuery } = invoicesApi
