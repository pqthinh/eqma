import React from 'react'
import useRequestManager from '../useRequestManager'
import EndPoint from 'config/api/EndPoint'

const useUpload = () => {
  const [result, setResult] = React.useState(null)
  const { onPostExecute } = useRequestManager()
  const { IMAGE } = EndPoint

  const onUpload = React.useCallback(file => {
    console.log(file)
    const formData = new FormData()
    formData.append('image', file)
    const result = onPostExecute(IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(result)
    const r = 'https://picsum.photos/200/300'
    setResult(r)
  }, [])

  return { onUpload, result: result }
}

export default useUpload
