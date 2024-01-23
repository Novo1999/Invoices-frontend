export const styleBtn = (isDark) => {
  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black border border-white'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 border border-black border-2'
  let btnStyle =
    'relative flex items-center p-2 text-sm text-gray-600 border border-transparent rounded-md focus:border-black focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none mt-1'
  return `${btnStyle} ${darkGradient}`
}

export const styleOption = (isDark) => {
  const darkGradient = isDark
    ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    : 'bg-gradient-to-r from-blue-500 to-blue-600 '
  let optionStyle =
    'block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
  return `${optionStyle} ${darkGradient}`
}
