import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEquipment, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Equipment = ({ ...others }) => {
  const [listEqu, setListEqu] = useState([])
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
      <TableEquipment
        expData={listEqu}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
        sort={sort}
        setSort={setSort}
      />
    )
  }, [listEqu, page, totalRecord, sort, setSort])

  const getListEqu = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_EQU, {
          ...params
        })
        if (result) {
          setListEqu(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result) )
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) getListEqu({ name: searchInput, page: page - 1 })
  }, [searchInput, page, reload])

  useEffect(() => {
    if (sort.key)
      getListEqu({
        search: searchInput,
        offset: page - 1,
        sort: sort.key,
        type: sort.type
      })
  }, [sort])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Quản lý thiết bị'}
      {...others}
    >
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(Equipment)
