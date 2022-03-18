import React, { useCallback, useState, useEffect } from 'react'
import NotFoundPage from '../../NotFoundPage'
import { Content, ContentBody } from './styled'
import { useRequestManager } from 'hooks'
import { withArray, withObject } from 'exp-value'
import { EndPoint } from 'config/api'

const EmployeeDetail = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const [info, setInfo] = useState()
  const [request, setRequest] = useState()
  const [liquidation, setLiquidation] = useState()
  const [repair, setRepair] = useState()
  const [equiment_log, setEquiment_log] = useState()

  const { onGetExecute } = useRequestManager()

  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const getEmp = useCallback(params => {
    async function execute(params) {
      const result = await onGetExecute(EndPoint.GET_LIST_EMP, {
        params: params
      })
      if (result) {
        setInfo(withObject('data', result))
        setRequest(withArray('data.request', result))
        setRepair(withArray('data.repair', result))
        setLiquidation(withArray('data.liquidation', result))
        setEquiment_log(withArray('data.equipment_status_log', result))
      }
    }
    console.log(params, 'params')
    execute(params)
  }, [])

  useEffect(getEmp, [])

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return null
    }
    if (activeKeyNav == '2') {
      return null
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  const InfoEmp = () => {
    return <p>Thinh</p>
  }

  return (
    <ContentBody
      contentBody={'Thông tin nhân viên'}
      items={[
        { contentName: 'Lịch sử yêu cầu', iconName: 'feather-gift' },
        { contentName: 'Lịch sử mượn trả', iconName: 'feather-tool' }
      ]}
      activeKey={activeKeyNav}
      setActiveKey={onSelect}
      top={<InfoEmp />}
    >
      <Content>{_renderContentPage()}</Content>
    </ContentBody>
  )
}

export default EmployeeDetail
