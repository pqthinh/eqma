import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableDepartment, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { FormAddEmp, Modal } from './styled'

const Department = ({ ...others }) => {
  const [listDep, setListDep] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return (
      <TopBody
        search={search}
        setSearch={setSearch}
        buttonAction={() => setShowModal(true)}
      />
    )
  }, [search])

  const _renderModal = useCallback(() => {
    if (!showModal) return
    return (
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        header='Thêm bộ phận'
        body={
          <FormAddEmp
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

  const _renderTable = useCallback(() => {
    return (
      <TableDepartment
        expData={listDep}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listDep, page, totalRecord])

  const getListDep = useCallback(params => {
    async function execute(params) {
      const result = await onGetExecute(EndPoint.GET_LIST_DEPART, {
        params: params
      })
      if (result) {
        setListDep(withArray('data', result))
        setTotalRecord(withNumber('total', result))
      }
    }
    execute(params)
  }, [])

  useEffect(() => {
    if (reload) {
      getListDep({ name: searchInput, page: page })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListDep({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContentBody top={TopTab()} contentBody={'Phòng ban'} {...others}>
      {_renderModal()}
      {_renderTable()}
    </WrapperContentBody>
  )
}

export default React.memo(Department)
