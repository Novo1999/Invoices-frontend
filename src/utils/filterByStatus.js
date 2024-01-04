import { DRAFT, PAID, PENDING } from './constants.js'

export const filterByStatus = (filterBy, item) => {
  if (filterBy === DRAFT) {
    return item.status === DRAFT
  }
  if (filterBy === PENDING) {
    return item.status === PENDING
  }
  if (filterBy === PAID) {
    return item.status === PAID
  }
  return item
}
