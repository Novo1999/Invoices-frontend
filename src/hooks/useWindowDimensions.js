import { useState, useEffect } from 'react'
import _debounce from 'lodash/debounce'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    // Debounce the handleResize function with a delay of 200 milliseconds
    const debouncedHandleResize = _debounce(() => {
      setWindowDimensions(getWindowDimensions())
    }, 200)

    // Attach the debounced function to the resize event
    window.addEventListener('resize', debouncedHandleResize)

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return windowDimensions
}
