import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableRequest, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import { Modal, FormAddEmp } from './styled'

const History = ({ ...others }) => {
  const [listEmp, setListEmp] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [showModalEmp, setShowModalEmp] = useState(false)
  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)

  const TopTab = React.useCallback(() => {
    return (
      <TopBody
        search={search}
        setSearch={setSearch}
        buttonAction={() => setShowModalEmp(true)}
      />
    )
  }, [search])

  const _renderModalEmp = useCallback(() => {
    if (!showModalEmp) return
    return (
      <Modal
        show={showModalEmp}
        onHide={() => setShowModalEmp(false)}
        header='Thêm yêu cầu'
        body={
          <FormAddEmp
            type='create'
            setReload={e => {
              setReload(e)
              setShowModalEmp(false)
            }}
          />
        }
      />
    )
  }, [showModalEmp])

  const _renderTableEmp = useCallback(() => {
    return (
      <TableRequest
        expData={listEmp}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listEmp, page, totalRecord, reload])

  const getListEmp = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_REQ, {params: params})
        if (result) {
          setListEmp(withArray('data', result))
          setTotalRecord(withNumber('total', result))
        }
      }
      execute(params)
    },
    []
  )

  useEffect(() => {
    if (reload) {
      getListEmp({ name: searchInput, page: page })
      setReload(false)
    }
  }, [reload, searchInput, page])

  useEffect(() => {
    if (!reload) getListEmp({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Danh sách nhân viên'}
      {...others}
    >
      {_renderModalEmp()}
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default React.memo(History)
