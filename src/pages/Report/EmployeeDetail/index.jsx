import { IMAGES } from 'assets'
import React, { useCallback, useMemo, useState } from 'react'
import NotFoundPage from '../../NotFoundPage'
import { ContentBody, Image, Content } from './styled'

const EmployeeDetail = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const renderTimeline = useMemo(() => {
    return <Image source={IMAGES.NO_CONTENT.default} />
  }, [])

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return null
    }
    if (activeKeyNav == '2') {
      return null
    }
    if (activeKeyNav == '3') {
      return null
    }
    if (activeKeyNav == '4') {
      return renderTimeline
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  return (
    <ContentBody
      contentBody={"Thông tin nhân viên"}
      items={[
        { contentName: 'Lịch sử yêu cầu', iconName: 'feather-gift' },
        { contentName: 'Lịch sử mượn trả', iconName: 'feather-tool' },
      ]}
      activeKey={activeKeyNav}
      setActiveKey={onSelect}
    >
      <Content>{_renderContentPage()}</Content>
    </ContentBody>
  )
}

export default EmployeeDetail
