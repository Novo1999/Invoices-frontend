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
        const postResult1 = dispatch(
          invoiceApi.util.updateQueryData('getInvoices', undefined, (draft) => {
            draft.push(data)
          })
        )
        const postResult2 = dispatch(
          invoiceApi.util.updateQueryData(
            'getOrdersOfInvoices',
            undefined,
            (draft) => {
              draft.push(data.id)
            }
          )
        )
        dispatch(invoiceApi.endpoints.addOrder.initiate({ data: data.id }))
        try {
          await queryFulfilled
        } catch (error) {
          postResult1.undo()
          postResult2.undo()
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
    addOrder: builder.mutation({
      query: (data) => ({
        url: '/order',
        method: 'POST',
        body: data,
      }),
    }),
    getInvoice: builder.query({
      query: (id) => `/protected/${id}`,
    }),
    deleteInvoice: builder.mutation({
      query: ({ _id, id }) => ({
        url: `/protected/${_id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ _id, id }, { dispatch, queryFulfilled }) {
        const deleteResult1 = dispatch(
          invoiceApi.util.updateQueryData('getInvoices', undefined, (draft) => {
            return draft.filter((item) => item._id !== _id)
          })
        )
        const deleteResult2 = dispatch(
          invoiceApi.util.updateQueryData(
            'getOrdersOfInvoices',
            undefined,
            (draft) => {
              const indexToRemove = draft.order.findIndex(
                (value) => value === id
              )
              draft.order.splice(indexToRemove, 1)
              return draft
            }
          )
        )
        try {
          await queryFulfilled
        } catch (error) {
          deleteResult1.undo()
          deleteResult2.undo()
        }
      },
    }),
    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `/order`,
        method: 'PATCH',
        body: data,
      }),
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
  useAddOrderMutation,
  useGetInvoiceQuery,
  useDeleteInvoiceMutation,
} = invoicesApi
