import invoiceApi from '../api/apiSlice.js'

const invoicesApi = invoiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => '/protected',
    }),
    addInvoice: builder.mutation({
      query: (data) => ({
        url: '/protected/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          invoiceApi.util.updateQueryData('getInvoices', undefined, (draft) => {
            draft.push(data)
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          postResult.undo()
        }
      },
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
    changeInvoiceStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/protected/mark/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          invoiceApi.util.updateQueryData('getInvoice', id, (draft) => {
            draft.map((invoice) => {
              if (invoice._id === id) {
                invoice.status = data.status
              }
              return invoice
            })
          })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useGetOrdersOfInvoicesQuery,
  useReorderInvoicesMutation,
  useChangeInvoiceStatusMutation,
  useGetInvoiceQuery,
} = invoicesApi
