import { Container, Content } from 'rsuite'
import styled from 'styled-components'

export const Wrapper = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 480px) {
    display: block;
  }
`
export const BodyWrapper = styled(Content)`
  position: relative;
  height: 100%;
  background: ${props => props.theme.colors.background};
`


export const LayoutWrapper = styled(Container)`
  display: block;
  background-color: ${props => props.theme.colors.gray[1]};
  height: 100vh;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
`