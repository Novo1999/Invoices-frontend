import invoiceApi from '../api/apiSlice.js'

const invoicesApi = invoiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => '/protected',
    }),
    reorderInvoices: builder.mutation({
      query: (order) => ({
        url: '/order',
        method: 'PATCH',
        body: order,
      }),
    }),
    getOrdersOfInvoices: builder.query({
      query: () => '/order',
    }),
    getInvoice: builder.query({
      query: (id) => `/protected/${id}`,
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useGetOrdersOfInvoicesQuery,
  useReorderInvoicesMutation,
  useGetInvoiceQuery,
} = invoicesApi
