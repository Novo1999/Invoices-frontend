const ResButton = ({ children, type }) => {
  let style = {}

  if (type === 'edit') {
    style = {
      background: 'bg-gray-200 text-gray-500',
      tooltip: '🖊️',
    }
  }
  if (type === 'delete') {
    style = {
      tooltipClass: 'tooltip-error',
      background: 'bg-red-500 hover:bg-red-400',
      tooltip: '🗑️',
    }
  }
  if (type === 'mark as paid') {
    style = {
      background: 'bg-purple-500 hover:bg-purple-400',
      tooltip: '💸',
    }
  }

  const { background, tooltip, tooltipClass } = style

  return (
    <button
      className={`btn btn-sm ${background} ${tooltipClass} md:btn-md tooltip lg:btn-lg text-white rounded-[4rem]`}
      data-tip={tooltip}
    >
      {children}
    </button>
  )
}
export default ResButton
