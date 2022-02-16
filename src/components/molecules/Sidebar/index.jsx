import { IMAGES } from 'assets'
import { withEmpty } from 'exp-value'
import { useStorage, useToken, useUser } from 'hooks'
import React, { useCallback, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Whisper } from 'rsuite'
import { Constants, Routers } from 'utils'
import {
  Button,
  CardAvatar,
  DropdownItem,
  DropdownWrapper,
  Footer,
  GridItem,
  Header,
  Image,
  Menu,
  MenuBody,
  MenuHeader,
  MenuIcon,
  Navigator,
  NavItem,
  Text,
  TextLogo,
  WrapperContainer,
  WrapperPopover
} from './styled'

const Sidebar = props => {
  const { ...others } = props
  const [expanded, setExpanded] = React.useState(true)
  const [activeKey, setActiveKey] = React.useState('1')
  const [showHeaderMobile, setShowHeaderMobile] = React.useState(false)
  const history = useHistory()
  const location = useLocation()
  const { user } = useUser()
  const { reset } = useStorage()
  const { clearToken } = useToken()

  const onLogout = React.useCallback(() => {
    const execute = async () => {
      await reset()

      clearToken()

      history.push(Routers.SIGN_IN_PAGE)
    }

    execute()
  }, [])

  const goProfilePage = useCallback(() => {
    history.push(Routers.PROFILE)
  }, [])

  const handleResize = useCallback(() => {
    const { innerWidth: width } = window
    setExpanded(width > 1200 || width <= 480)
    setShowHeaderMobile(width <= 480)
  }, [])

  const renderHeaderSidebar = useCallback(() => {
    return !showHeaderMobile ? (
      <MenuHeader>
        <Header>
          <Image source={IMAGES.LOGO.default} />
          <TextLogo>WeMarket</TextLogo>
        </Header>
      </MenuHeader>
    ) : null
  }, [showHeaderMobile])

  const renderMenuSidebar = useCallback(() => {
    return (
      <Navigator>
        {Constants.navigators?.map(item =>
          !item.child ? (
            <NavItem
              eventKey={item.key}
              iconName={item.icon}
              content={item.label}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              key={item.key}
              onClick={() => history.push(Routers.NAV_LINK[item.key - 1])}
            />
          ) : (
            <DropdownWrapper
              key={item.key}
              eventKey={item.key}
              title={item.label}
              icon={<MenuIcon name={item.icon} />}
              placement='rightStart'
            >
              {item.child?.map(child => (
                <DropdownItem
                  eventKey={child.key}
                  key={child.key}
                  active={activeKey == eval(child.key)}
                  onSelect={e => {
                    history.push(Routers.NAV_LINK[eval(e - 1)])
                    setActiveKey(e)
                  }}
                >
                  {child.label}
                </DropdownItem>
              ))}
            </DropdownWrapper>
          )
        )}
      </Navigator>
    )
  }, [activeKey])

  const renderFooter = useCallback(user => {
    console.log(user)
    return (
      <Footer>
        <Whisper
          placement='auto'
          trigger='hover'
          controlId='control-id-hover-enterable'
          onClick={goProfilePage}
          speaker={
            <WrapperPopover title={withEmpty('full_name', user)}>
              <Text link onClick={goProfilePage}>
                Trang cá nhân
              </Text>

              <Button onClick={onLogout}>
                <MenuIcon name='feather-log-out' size={20} />
                <Text>Đăng xuất</Text>
              </Button>
            </WrapperPopover>
          }
          enterable
        >
          <CardAvatar
            source={withEmpty('avatar_url', user) || IMAGES.AVATAR.default}
            title={withEmpty('email', user)}
            subTitle={withEmpty('role', user) || 'Admin'}
            alt={withEmpty('name', user) || 'thinhpq'}
          />
        </Whisper>
      </Footer>
    )
  }, [])

  // handleActiveMenu
  useEffect(() => {
    let currentLink = Routers.NAV_LINK.indexOf(location.pathname)
    if (currentLink >= 0) return setActiveKey((currentLink + 1).toString())
    setActiveKey(null)
  }, [location])

  useEffect(handleResize, [])
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <GridItem md={1} sm={1} lg={4}>
      <WrapperContainer expanded={expanded}>
        <Menu
          {...others}
          expanded={expanded}
          defaultOpenKeys={['1', '2', '3', '4', '5', '8']}
        >
          {renderHeaderSidebar()}
          <MenuBody>
            {renderMenuSidebar()}
            {renderFooter(JSON.parse(JSON.stringify(user)))}
          </MenuBody>
        </Menu>
      </WrapperContainer>
    </GridItem>
  )
}

export default React.memo(Sidebar)
