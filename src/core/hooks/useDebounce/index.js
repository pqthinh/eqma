import React from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debounceValue
}

export default useDebounce
