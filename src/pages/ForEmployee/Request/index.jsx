import { EndPoint } from 'config/api'
import { withNumber } from 'exp-value'
import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEmployeeRequest, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'

const Request = ({ ...others }) => {
  const [listRequest, setListRequest] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} />
  }, [search])

  const _renderTableEmp = useCallback(() => {
    return (
      <TableEmployeeRequest
        expData={listRequest}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listRequest, page, totalRecord])

  const getListRequest = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_EREQ, {
          params: params
        })
        if (result) {
          setListRequest(result)
          setTotalRecord(withNumber('length', result))
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) {
      getListRequest({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListRequest({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContentBody top={TopTab()} contentBody={'Danh sách yêu cầu'} {...others}>
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(Request)
