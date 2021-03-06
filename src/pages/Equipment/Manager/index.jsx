import { IMAGES } from 'assets'
import React, { useCallback, useMemo, useState } from 'react'
import NotFoundPage from '../../NotFoundPage'
import { ContentBody, Image, Content } from './styled'
import Repair from '../Repair'
import Equiment from '../Equiment'
import Liquidation from '../Liquidation'
import Request from '../Request'

const EquimentManager = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const renderTimeline = useMemo(() => {
    return <Image source={IMAGES.NO_CONTENT.default} />
  }, [])

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return <Equiment />
    }
    if (activeKeyNav == '2') {
      return <Repair />
    }
    if (activeKeyNav == '3') {
      return <Liquidation />
    }
    if (activeKeyNav == '4') {
      return <Request />
    }
    if (activeKeyNav == '5') {
      return renderTimeline
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  return (
    <ContentBody
      contentBody={"Quản lý thiết bị"}
      items={[
        { contentName: 'Danh sách thiết bị', iconName: 'feather-gift' },
        { contentName: 'Thiết bị sửa chữa', iconName: 'feather-tool' },
        { contentName: 'Thiết bị thanh lý', iconName: 'feather-truck' },
        { contentName: 'Yêu cầu', iconName: 'feather-layers' },
      ]}
      activeKey={activeKeyNav}
      setActiveKey={onSelect}
    >
      <Content>{_renderContentPage()}</Content>
    </ContentBody>
  )
}

export default React.memo(EquimentManager)
