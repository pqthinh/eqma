import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEmployee, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import { Modal, FormAddEmp } from './styled'

const Employee = ({ ...others }) => {
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
        header='Thêm nhân viên'
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
      <TableEmployee
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
        const result = await onGetExecute(EndPoint.GET_LIST_EMP, {params: params})
        if (result) {
          setListEmp(withArray('data', result))
          setTotalRecord(withNumber('meta.total', result))
        }
      }
      console.log(params, "params")
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

export default React.memo(Employee)
