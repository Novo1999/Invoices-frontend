export const setFormWidth = (sidebarOpen, width) => {
  if (sidebarOpen && width <= 768) {
    return 320
  }
  if (sidebarOpen && width > 768) {
    return 500
  }
  if (!sidebarOpen) {
    return 0
  }
}
