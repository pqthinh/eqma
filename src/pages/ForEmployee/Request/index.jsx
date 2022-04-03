import { EndPoint } from 'config/api'
import { withNumber } from 'exp-value'
import { useDebounce, useRequestManager } from 'hooks'
import { TopBody } from 'molecules'
import { TableEmployeeRequest, WrapperContentBody } from 'organisms'
import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, Popover, Whisper } from 'rsuite'
import Constant from '../../../utils/Constants'
import { Icon,Button } from './styled'

const Request = ({ ...others }) => {
  const [listRequest, setListRequest] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [totalRecord, setTotalRecord] = useState(0)
  const [reload, setReload] = useState(true)
  const [type, setType] = useState(1)

  const { onGetExecute } = useRequestManager()

  const searchInput = useDebounce(search, 3000)
  const renderFilter = ({ left, top, className }, ref) => {
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu>
          {Object.entries(Constant.request_type).map(e => (
            <Dropdown.Item
              eventKey={e[0]}
              key={e[0]}
              active={type == e[0]}
              onSelect={e => {
                console.log(e, type)
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
      <TopBody search={search} setSearch={setSearch} dropdown={<DropdownC />} />
    )
  }, [search])

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
    [searchInput, page]
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

export default React.memo(Request)
