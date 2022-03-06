import React from 'react'

const useStorage = () => {
  const saveValue = React.useCallback((key, value) => {
    try {
      const execute = async () => {
        const jsonValue = JSON.stringify(value)
        await sessionStorage.setItem(key, jsonValue)
      }

      execute()
    } catch (error) {
      print('Error[useStorage-set]', error)
    }
  }, [])

  const getValue = React.useCallback(async key => {
    try {
      const jsonValue = await sessionStorage.getItem(key)
      const value = await JSON.parse(jsonValue)
      return value
    } catch (error) {
      print('Error[useStorage-get]', error)
    }
  })

  const reset = React.useCallback(async () => {
    try {
      await sessionStorage.clear()
    } catch (error) {
      print('Error[useStorage-reset]', error)
    }
  })

  return {
    saveValue,
    getValue,
    reset
  }
}

export default useStorage
