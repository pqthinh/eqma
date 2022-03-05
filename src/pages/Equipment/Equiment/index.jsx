import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEquipment, WrapperContent } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Equipment = ({ ...others }) => {
  const [listEqu, setListEqu] = useState([])
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
      <TableEquipment
        expData={listEqu}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listEqu, page, totalRecord])

  const getListEqu = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_EQU, {
          params: params
        })
        if (result) {
          setListEqu(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result))
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) {
      getListEqu({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListEqu({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContent top={TopTab()} {...others}>
      {_renderTableEmp()}
    </WrapperContent>
  )
}

export default React.memo(Equipment)
