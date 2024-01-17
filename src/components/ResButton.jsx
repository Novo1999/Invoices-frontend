const ResButton = ({ children, type, onClick }) => {
  let style = {}

  if (type === 'edit') {
    style = {
      background: 'bg-gray-200 text-gray-500',
      tooltip: '🖊️',
    }
  }
  if (type === 'delete') {
    style = {
      tooltipClass: 'tooltip-error text-white',
      background: 'bg-red-500 hover:bg-red-400',
      tooltip: '🗑️',
    }
  }
  if (type === 'mark as paid') {
    style = {
      background: 'bg-green-500 hover:bg-green-400 text-white w-full sm:w-fit',
      tooltip: '💸',
    }
  }

  if (type === 'mark as draft') {
    style = {
      background: 'bg-gray-500 hover:bg-gray-400 text-white w-full sm:w-fit',
      tooltip: '📝',
    }
  }

  if (type === 'mark as pending') {
    style = {
      background:
        'bg-orange-600 hover:bg-orange-500 text-white w-full sm:w-fit',
      tooltip: '⏳',
    }
  }

  const { background, tooltip, tooltipClass } = style

  return (
    <button
      onClick={onClick}
      className={`btn btn-md ${background} ${tooltipClass} md:btn-md tooltip lg:btn-lg rounded-[4rem]`}
      data-tip={tooltip}
    >
      {children}
    </button>
  )
}
export default ResButton
