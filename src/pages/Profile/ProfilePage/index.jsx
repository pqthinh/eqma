import { IMAGES } from 'assets'
import React, { useCallback, useMemo, useState } from 'react'
import { Constants } from 'utils'
import ChangePassword from '../ChangePassword'
import ProfileEdit from '../ProfileEdit'
import NotFoundPage from '../../NotFoundPage'
import { ContentBody, Image, WrapperContent } from './styled'

const ProfilePage = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const renderNotify = useMemo(() => {
    return <Image source={IMAGES.NO_CONTENT.default} />
  }, [])

  const renderTimeline = useMemo(() => {
    return <Image source={IMAGES.NO_CONTENT.default} />
  }, [])

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return <ProfileEdit />
    }
    if (activeKeyNav == '2') {
      return renderNotify
    }
    if (activeKeyNav == '3') {
      return renderTimeline
    }
    if (activeKeyNav == '4') {
      return <ChangePassword />
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  return (
    <ContentBody
      top={null}
      contentBody={Constants.contentPage[6].title}
      items={[
        { contentName: 'Thông tin', iconName: 'feather-user' },
        { contentName: 'Thông báo', iconName: 'feather-bell' },
        { contentName: 'Lịch hẹn', iconName: 'feather-calendar' },
        { contentName: 'Thay đổi mật khẩu', iconName: 'feather-shield' }
      ]}
      activeKey={activeKeyNav}
      setActiveKey={onSelect}
    >
      <WrapperContent>{_renderContentPage()}</WrapperContent>
    </ContentBody>
  )
}

export default React.memo(ProfilePage)
