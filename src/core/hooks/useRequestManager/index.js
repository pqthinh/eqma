import axios from 'axios'
import React from 'react'
import useToken from '../useToken'
import useLoading from '../useLoading'
import useAlert from '../useAlert'
import { withNull } from 'exp-value'

const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 2 * 60 * 1000
})

const useRequestManager = () => {
  const { setLoading } = useLoading()
  const { token, clearToken } = useToken()
  const { showError } = useAlert()
  const [status, setStatus] = React.useState(null)

  const headers = React.useMemo(
    () => ({
      Authorization: `Bearer ${token}`
    }),
    [token]
  )

  const onGetExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true)
        try {
          const { data } = await instance.get(url, { headers, ...entity })
          setLoading(false)
          return data
        } catch (error) {
          setStatus(withNull('response.status', error))
          setLoading(false)
          showError(withNull('response.message', error))
        }
      }

      return execute()
    },
    [headers]
  )

  const onPostExecute = React.useCallback(
    (url, entity = {}, hasHeader = true) => {
      const execute = async () => {
        setLoading(true)
        try {
          const { data } = await instance.post(
            url,
            entity,
            hasHeader ? { headers } : {}
          )
          setLoading(false)
          return data
        } catch (error) {
          setStatus(withNull('response.status', error))
          setLoading(false)
          showError(withNull('response.data.message', error))
          clearToken()
        }
      }
      return execute()
    },
    [headers]
  )

  const onPatchExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true)
        try {
          const { data } = await instance.patch(url, entity, { headers })
          setLoading(false)
          return data
        } catch (error) {
          setStatus(withNull('response.status', error))
          setLoading(false)
          showError(withNull('response.data.message', error))
        }
      }
      return execute()
    },
    [headers]
  )

  const onPutExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true)
        try {
          const { data } = await instance.post(url, entity, {
            headers
          })
          setLoading(false)
          return data
        } catch (error) {
          setStatus(withNull('response.status', error))
          setLoading(false)
        }
      }
      return execute()
    },
    [headers]
  )

  const onDeleteExecute = React.useCallback(
    (url, entity = {}) => {
      const execute = async () => {
        setLoading(true)
        try {
          const { data } = await instance.delete(url, { headers, ...entity })
          setLoading(false)
          return data
        } catch (error) {
          setStatus(withNull('response.status', error))
          setLoading(false)
        }
      }
      return execute()
    },
    [headers]
  )

  const onStatusHandler = React.useCallback(() => {
    const execute = async () => {
      switch (status) {
        case 400:
          break
        case 401:
          await clearToken()

          break
        default:
          break
      }
    }

    if (status) execute()
  }, [status])

  React.useEffect(onStatusHandler, [status])

  return {
    onGetExecute,
    onPostExecute,
    onPutExecute,
    onDeleteExecute,
    onPatchExecute
  }
}

export default useRequestManager
