import _debounce from 'lodash/debounce'
let debouncedReorder = _debounce(
  async (reorderInvoices, reorderedInvoicesIds) => {
    try {
      await reorderInvoices(reorderedInvoicesIds)
    } catch (error) {
      console.log(error)
    }
  },
  1200
)

export default debouncedReorder
