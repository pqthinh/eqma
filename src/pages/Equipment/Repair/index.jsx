import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableRepair, WrapperContent } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Repair = ({ ...others }) => {
  const [listRepair, setListRepair] = useState([])
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
      <TableRepair
        expData={listRepair}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listRepair, page, totalRecord])

  const getListRepair = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_REP, {
          params: params
        })
        if (result) {
          setListRepair(withArray('data', result))
          setTotalRecord(withNumber('total', result))
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) {
      getListRepair({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListRepair({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContent top={TopTab()} {...others}>
      {_renderTableEmp()}
    </WrapperContent>
  )
}

export default React.memo(Repair)
