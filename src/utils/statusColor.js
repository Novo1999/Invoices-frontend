export const setStatusBallColor = (status) => {
  if (status === 'paid') return 'text-green-300'
  if (status === 'pending') return 'text-orange-400'
  if (status === 'draft') return 'text-gray-200'
}

export const setStatusColor = (status) => {
  if (status === 'paid') return 'bg-green-500'
  if (status === 'pending') return 'bg-orange-600'
  if (status === 'draft') return 'bg-gray-500'
}
