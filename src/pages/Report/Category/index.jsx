import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableCategory, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'

const Category = ({ ...others }) => {
  const [listCate, setListCate] = useState([])
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
      <TableCategory
        expData={listCate}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
        sort={sort}
        setSort={setSort}
      />
    )
  }, [listCate, page, totalRecord, sort, setSort])

  const getListCate = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_CATE, {
          ...params
        })
        if (result) {
          setListCate(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result) )
        }
      }
      execute(params)
    },
    [searchInput, page]
  )

  useEffect(() => {
    if (reload) getListCate({ search: searchInput, page: page - 1 })
  }, [searchInput, page, reload])

  useEffect(() => {
    if (sort.key)
      getListCate({
        search: searchInput,
        offset: page - 1,
        sort: sort.key,
        type: sort.type
      })
  }, [sort])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Danh mục'}
      {...others}
    >
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(Category)
