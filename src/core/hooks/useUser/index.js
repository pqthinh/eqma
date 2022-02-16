import React from 'react'
import useStorage from '../useStorage'

const useUser = () => {
  const [user, setUser] = React.useState(null)
  const { getValue, saveValue } = useStorage()

  const onGetUser = React.useCallback(() => {
    async function getProfile() {
      const u = await getValue(process.env.SECRET_USER_KEY)
      setUser(u)
    }
    getProfile()
  }, [])

  const saveUser = React.useCallback(
    value => {
      setUser(value)
      saveValue(process.env.SECRET_USER_KEY, value)
    },
    [user]
  )

  React.useEffect(onGetUser, [])

  return { user, saveUser }
}

export default useUser
