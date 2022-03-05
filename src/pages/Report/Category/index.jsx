import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableCategory, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import { Modal, FormAdd } from './styled'

const Category = ({ ...others }) => {
  const [listCate, setListCate] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return <TopBody search={search} setSearch={setSearch} buttonAction={() => setShowModal(true)}/>
  }, [search])

  const _renderModal = useCallback(() => {
    if (!showModal) return
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        header='Thêm danh mục'
        body={
          <FormAdd
            type='create'
            setReload={e => {
              setReload(e)
              setShowModal(false)
            }}
          />
        }
      />
    )
  }, [showModal])

  const _renderTableEmp = useCallback(() => {
    return (
      <TableCategory
        expData={listCate}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listCate, page, totalRecord])

  const getListCate = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_CATE, {
          params: params
        })
        if (result) {
          setListCate(withArray('data', result))
          setTotalRecord(withNumber('total', result) )
        }
      }
      execute(params)
    },
    []
  )

  useEffect(() => {
    if (reload) {getListCate({ name: searchInput, page: page  })
    setReload(false)
  }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListCate({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Danh mục'}
      {...others}
    >
      {_renderModal()}
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(Category)
