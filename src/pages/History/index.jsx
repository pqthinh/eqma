import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableRequest, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { EndPoint } from 'config/api'
import { withArray, withNumber } from 'exp-value'
import {Popover,Dropdown ,Whisper} from 'rsuite'
import {Icon, Button} from './styled'
import Constant from '../../utils/Constants'

const History = ({ ...others }) => {
  const [listEmp, setListEmp] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const { onGetExecute } = useRequestManager()
  const [type, setType] = useState()

  const searchInput = useDebounce(search, 3000)

  const renderFilter = ({ left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu>
          {Object.entries({...{0: 'Tất cả'}, ...Constant.request_type}).map(e => (
            <Dropdown.Item
              eventKey={e[0]}
              key={e[0]}
              active={type == e[0]}
              onSelect={e => {
                setType(e)
              }}
            >
              {e[1]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Popover>
    )
  }

  const DropdownC = () =>  (
    <Whisper placement='auto' trigger='click' speaker={renderFilter}>
      <Button style={{display: 'flex', justifyContent: 'space-between'}}>Lọc<Icon name='filter' /></Button>
    </Whisper>
  )

  const TopTab = React.useCallback(() => {
    return (
      <TopBody
        search={search}
        setSearch={setSearch}
        dropdown={<DropdownC />}
      />
    )
  }, [search])

  const _renderTable = useCallback(() => {
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

  const getListLog = useCallback(
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
      if(type) getListLog({ name: searchInput, page: page - 1, type })
      else getListLog({ name: searchInput, page: page - 1 })
      setReload(false)
    }
  }, [searchInput, page, reload, type])

  useEffect(() => {
    if (!reload) {
      if(type) getListLog({ name: searchInput, page: page, type })
      else getListLog({ name: searchInput, page: page })
    }
  }, [searchInput, page, type])

  return (
    <WrapperContentBody
      top={TopTab()}
      contentBody={'Lịch sử mượn-trả'}
      {...others}
    >
      {_renderTable()}
    </WrapperContentBody>
  )
}

export default React.memo(History)
