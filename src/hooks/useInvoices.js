import { useEffect, useState } from 'react'
import {
  useGetInvoicesQuery,
  useGetOrdersOfInvoicesQuery,
  useReorderInvoicesMutation,
} from '../features/invoicesApi/invoicesApi.js'
import debouncedReorder from '../utils/debouncedReorder.js'
import { useSelector } from 'react-redux'

export const useInvoices = () => {
  const { filterBy } = useSelector((state) => state.filter)
  const {
    data: invoices,
    isLoading,
    isError,
    error,
  } = useGetInvoicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const {
    data: invoicesOrder,
    isSuccess,
    isLoading: isLoadingOrder,
    isError: isOrderError,
  } = useGetOrdersOfInvoicesQuery()

  const [reorderInvoices] = useReorderInvoicesMutation()

  // state for reordering by dragging
  const [items, setItems] = useState([])
  // setting dragListener to true for mobile
  const [isDragging, setIsDragging] = useState(false)

  // set items when no loading or error state on mount
  useEffect(() => {
    if (!isLoading && !isError) {
      setItems(invoices)
    }
  }, [invoices, isLoading, isError])

  useEffect(() => {
    if (isSuccess && !isOrderError) {
      setItems((current) =>
        invoicesOrder?.order.map((id) => {
          return current.find((item) => item.id === id)
        })
      )
    }
  }, [isSuccess, invoicesOrder, isOrderError])

  // this reorders the invoices
  const handleReorder = (reorderedIds) => {
    const reorderedInvoices = reorderedIds.map((id) =>
      items.find((invoice) => invoice.id === id)
    )
    setItems(reorderedInvoices)
    const reorderedInvoicesIds = reorderedInvoices.map((invoice) => invoice.id)

    // Cancel the previous debouncedReorder function
    debouncedReorder.cancel()

    // Call the debounced function
    debouncedReorder(reorderInvoices, reorderedInvoicesIds)
  }
  return {
    isLoading,
    isLoadingOrder,
    isError,
    isSuccess,
    invoices,
    handleReorder,
    items,
    isDragging,
    setIsDragging,
    filterBy,
    isOrderError,
    error,
  }
}
