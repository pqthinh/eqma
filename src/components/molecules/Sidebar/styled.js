import styled from 'styled-components'
import { Sidenav, Nav, Dropdown, Popover } from 'rsuite'
import {
  BaseIcon,
  BaseImage,
  BaseText,
  BaseNavItem,
  BaseItemGrid,
  BaseButton
} from 'atoms'
import AvatarGroup from '../AvatarGroup'

export const WrapperContainer = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.white};
  box-sizing: border-box;
  width: 100%;
  display: inline-table;
  position: relative;
  @media screen and (max-width: 480px) {
    width: 100%;
    display: block;
  }
`
export const GridItem = styled(BaseItemGrid)`
  padding: 0;
  height: 100vh;
  @media screen and (max-width: 480px) {
    height: calc(100vh - 90px);
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
  @media screen and (max-width: 1200px) and (min-width: 480px) {
    min-width: 56px;
  }
`
export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 20px 10px;
  @media screen and (max-width: 1200px) and (min-width: 480px) {
    padding: 20px 5px;
    div {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    svg {
      width: 30px;
      margin: 10px;
    }
  }
`
export const Menu = styled(Sidenav)`
  background: ${props => props.theme.colors.transparent}; ;
`
export const MenuHeader = styled(Sidenav.Header)`
  display: flex;
  align-items: center;
  max-height: 60px;
`
export const MenuIcon = styled(BaseIcon)`
  position: absolute;
  left: 15px;
`
export const Image = styled(BaseImage)`
  height: 50px;
  object-fit: contain;
`
export const TextLogo = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  padding: 10px;
`
const hiddenMenu = `
  display: none;
`
const showMenu = `
  display: block;
`
export const MenuBody = styled(Sidenav.Body)`
  ${props => (props.active == 'true' ? hiddenMenu : showMenu)};
`
export const WrapperIcon = styled.div`
  min-width: 30px;
  display: flex;
  align-items: center;
`
export const Navigator = styled(Nav)`
  position: absolute;
  width: 100%;

  @media screen and (max-height: 670px) {
    height: 75vh;

    overflow: scroll;
    // overflow-x: visible ;
    &::-webkit-scrollbar {
      width: 0;
    }
    scrollbar-width: none;

    @media screen and (max-height: 670px) {
      // padding-bottom: 50px;
    }
  }
`
export const NavItem = styled(BaseNavItem)``

const styleActive = theme => {
  return ` 
  a {
    background: ${theme.colors.sideNav} !important;
    color: ${theme.colors.gray[1]} !important;
    font-weight: bold;
    padding-right: 3px;
    svg {
      color: ${theme.colors.primary};
    }
    &:after {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
      width: 3px;
      border-radius: 2px 0 0 2px;
      background: ${theme.colors.primary};
    }

    @media screen and (max-width: 1200px) and (min-width: 480px), (max-height: 480px) {
      div {
        display: none !important;;
      }
    }
  }
  position: relative;
  `
}
export const DropdownWrapper = styled(Dropdown)`
  ${props => props.active && styleActive(props.theme)};
  a {
    color: ${props => props.theme.colors.gray[1]};
  }
  @media screen and (max-height: 670px) {
    .rs-dropdown-menu {
      left: 0 !important;
      top: 100% !important;
    }
  }
`
export const DropdownItem = styled(Dropdown.Item)`
  ${props => props.active && styleActive(props.theme)}
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const CardAvatar = styled(AvatarGroup)``
export const Footer = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 20px;
  left: 5px;
  right: 5px;
  display: block;

  background: ${props => props.theme.colors.secondary};
  @media screen and (max-width: 1200px) and (min-width: 480px),
    (max-height: 480px) {
    width: 100%;
    bottom: 5px;
    left: 0;
    right: 0;
  }
  @media screen and (max-width: 480px) {
    bottom: 5px;
  }
`
export const WrapperPopover = styled(Popover)``
export const Button = styled(BaseButton)`
  margin-top: 20px;
  padding: 5px 10px 5px 40px;
  & div {
    color: ${props => props.theme.colors.secondary};
    &:hover {
      color: ${props => props.theme.colors.black};
    }
  }
`
