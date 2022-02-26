import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEmployee, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Employee = ({ ...others }) => {
  const [listEmp, setListEmp] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [sort, setSort] = useState({
    key: '',
    type: ''
  })
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} />
  }, [search])

  const _renderTableEmp = useCallback(() => {
    return (
      <TableEmployee
        expData={listEmp}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
        sort={sort}
        setSort={setSort}
      />
    )
  }, [listEmp, page, totalRecord, sort, setSort])

  const getListEmp = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_EMP, {
          ...params
        })
        if (result) {
          setListEmp(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result) )
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) getListEmp({ name: searchInput, page: page - 1 })
  }, [searchInput, page, reload])

  useEffect(() => {
    if (sort.key)
      getListEmp({
        search: searchInput,
        offset: page - 1,
        sort: sort.key,
        type: sort.type
      })
  }, [sort])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Danh sách nhân viên'}
      {...others}
    >
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(Employee)
