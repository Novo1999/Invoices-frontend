import moment from 'moment'
import invoiceApi from '../api/apiSlice.js'
import { current } from '@reduxjs/toolkit'

const invoicesApi = invoiceApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET INVOICES
    getInvoices: builder.query({
      query: () => '/protected',
    }),
    // GET INVOICE
    getInvoice: builder.query({
      query: (id) => `/protected/${id}`,
    }),
    // DELETE INVOICE
    deleteInvoice: builder.mutation({
      query: ({ _id }) => ({
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
    // ADD INVOICES
    addInvoice: builder.mutation({
      query: (data) => ({
        url: '/protected/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const postResult1 = dispatch(
          invoiceApi.util.updateQueryData('getInvoices', undefined, (draft) => {
            const { itemList } = data
            const updatedCacheData = {
              ...data,
              status: 'draft',
              amount: itemList.reduce((acc, curr) => {
                return acc + curr.price * curr.quantity
              }, 0),
            }
            draft.push(updatedCacheData)
          })
        )
        const postResult2 = dispatch(
          invoiceApi.util.updateQueryData(
            'getOrdersOfInvoices',
            undefined,
            (draft) => {
              draft.order.push(data.id)
            }
          )
        )
        try {
          await queryFulfilled
        } catch (error) {
          postResult1.undo()
          postResult2.undo()
        }
      },
    }),
    // EDIT INVOICE
    editInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/protected/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ data, id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          invoiceApi.util.updateQueryData('getInvoice', id, (draft) => {
            const existingInvoice = current(draft)[0] // Get the existing invoice data
            if (existingInvoice) {
              const {
                clientStreet,
                fromCity,
                fromCountry,
                fromPostCode,
                itemList,
                payment,
                toCity,
                toCountry,
                toPostCode,
                street,
                email,
                name,
                project,
                date,
              } = data

              draft[0] = {
                ...existingInvoice, // Preserve existing values
                billFrom: {
                  city: fromCity,
                  country: fromCountry,
                  postCode: fromPostCode,
                  street,
                },
                billTo: {
                  city: toCity,
                  country: toCountry,
                  postCode: toPostCode,
                  street: clientStreet,
                },
                due: payment.toString(),
                paymentTerm: payment,
                items: itemList.map((item) => {
                  return {
                    ...item,
                    name: item.itemName,
                  }
                }),
                email,
                name,
                project,
                invoiceDate: moment(date).format('DD MMMM YYYY'),
              }

              return draft
            }
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),
    // CHANGE INVOICE STATUS
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
    // REORDER
    reorderInvoices: builder.mutation({
      query: (order) => ({
        url: '/order',
        method: 'PATCH',
        body: order,
      }),
    }),
    // GET ORDERS
    getOrdersOfInvoices: builder.query({
      query: () => '/order',
    }),
    // ADD ORDER
    addOrder: builder.mutation({
      query: (data) => ({
        url: '/order',
        method: 'POST',
        body: data,
      }),
    }),
    // DELETE ORDER
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order`,
        method: 'PUT',
        body: id,
      }),
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
  useEditInvoiceMutation,
} = invoicesApi
