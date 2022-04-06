import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableRequest, WrapperContent } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Request = ({ ...others }) => {
  const [listRequest, setListRequest] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)
  const [filter, setFilter] = useState({
    equipment_code: '',
    type: '',
    status: '',
    employee_code: ''
  })

  const handleChangeFilter = useCallback(
    (field, value) => {
      setFilter(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [filter]
  )

  const _renderTableEmp = useCallback(() => {
    return (
      <TableRequest
        expData={listRequest}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listRequest, page, totalRecord])
  const submitSearch = () => {
    getListRequest({ name: searchInput, page: page, ...filter })
  }

  const getListRequest = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_REQ, {
          params: params
        })
        if (result) {
          setListRequest(withArray('data', result))
          setTotalRecord(withNumber('total', result))
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
    <WrapperContent
      top={
        <TopBody
          search={search}
          setSearch={setSearch}
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          submit={submitSearch}
          se={{
            type: true,
            status: true,
            equipment_code: true,
            employee_code: true
          }}
        />
      }
      {...others}
    >
      {_renderTableEmp()}
    </WrapperContent>
  )
}

export default Request
