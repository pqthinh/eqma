import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableLiquidation, WrapperContent } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import { useHistory } from 'react-router-dom'

const Liquidation = ({ ...others }) => {
  const [listLiq, setListLiq] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const { onGetExecute } = useRequestManager()
  const history = useHistory()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} buttonAction={() => history.push("/liquidation/form")}/>
  }, [search])

  const _renderTableLiq = useCallback(() => {
    return (
      <TableLiquidation
        expData={listLiq}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listLiq, page, totalRecord,reload])

  const getListLiq = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_LIQ, {
          params: params
        })
        if (result) {
          setListLiq(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result))
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) {
      getListLiq({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListLiq({ name: searchInput, page: page })
  }, [searchInput, page,reload])

  return (
    <WrapperContent top={TopTab()} {...others}>
      {_renderTableLiq()}
    </WrapperContent>
  )
}

export default React.memo(Liquidation)
