import { EndPoint } from 'config/api'
import { withEmpty, withNumber } from 'exp-value'
import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEmployeeRequest, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite'
import { InputGroup } from 'molecules'
import Constant from '../../../utils/Constants'
import { Icon, Button, Form } from './styled'

const Request = ({ ...others }) => {
  const [listRequest, setListRequest] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)

  const { onGetExecute } = useRequestManager()
  const [filter, setFilter] = useState()

  const _handleChangeFilter = useCallback(
    (field, value) => {
      setFilter(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [filter]
  )
  const searchInput = useDebounce(search, 3000)
  const DropdownC = () => {
    return (
      <Form onSubmit={() => console.log(filter)} formValue={filter}>
        <InputGroup
          value={withEmpty('equipment_code', filter)}
          onChange={e => _handleChangeFilter('equipment_code', e)}
          placeholder={'Mã thiết bị'}
          name={'equipment_code'}
          leftIcon={<Icon name={'feather-bookmark'} />}
        />
        <InputGroup
          data={[{ value: '', label: 'Tất cả' }, ...Constant.dropdown_rtype]}
          value={withEmpty('type', filter) || 0}
          onChange={value => _handleChangeFilter('type', value)}
          placeholder={'Hình thức'}
          name={'type'}
          leftIcon={<Icon name={'feather-align-justify'} />}
          placement='autoVerticalStart'
          accepter={SelectPicker}
          searchable={false}
          size='sm'
        />
        <InputGroup
          data={Constant.dropdown_status}
          value={withEmpty('status', filter) || 0}
          onChange={value => _handleChangeFilter('status', value)}
          placeholder={'Trạng thái'}
          name={'status'}
          leftIcon={<Icon name={'feather-align-justify'} />}
          placement='autoVerticalStart'
          accepter={SelectPicker}
          searchable={false}
          size='sm'
        />

        <Button
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={() =>
            getListRequest({ name: searchInput, page: page, ...filter })
          }
        >
          Lọc
          <Icon name='filter' />
        </Button>
      </Form>
    )
  }

  const TopTab = () => {
    return (
      <TopBody search={search} setSearch={setSearch} >
        <DropdownC />
      </TopBody>
    )
  }

  const _renderTableEmp = useCallback(() => {
    return (
      <TableEmployeeRequest
        expData={listRequest}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        setReload={setReload}
        limit={10}
      />
    )
  }, [listRequest, page, totalRecord])

  const getListRequest = useCallback(
    params => {
      async function execute(params) {
        const result = await onGetExecute(EndPoint.GET_LIST_EREQ, {
          params: params
        })
        if (result) {
          setListRequest(result)
          setTotalRecord(withNumber('length', result))
        }
      }
      execute(params)
    },
    [searchInput, page, filter]
  )

  useEffect(() => {
    if (reload) {
      getListRequest({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload])

  useEffect(() => {
    if (!reload) getListRequest({ name: searchInput, page: page })
  }, [searchInput, page])

  return (
    <WrapperContentBody top={TopTab()} contentBody={'Lịch sử'} {...others}>
      {_renderTableEmp()}
    </WrapperContentBody>
  )
}

export default Request
