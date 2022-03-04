import { BaseNav } from 'atoms'
import { Container, Content } from 'rsuite'
import styled from 'styled-components'

export const ContentBody = styled(Container)`
  background: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`
export const LayoutWrapper = styled(Container)`
  display: block;
  width: 100%;
  height: 100%;
`
export const BodyWrapper = styled(Content)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
export const Nav = styled(BaseNav)``