import { ErrorPage } from 'molecules'
import { BaseText, BaseIcon } from 'atoms'
import styled from 'styled-components'

export const WrapperErrorPage = styled(ErrorPage)``
export const Contain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  div {
    color: ${props => props.theme.colors.white} !important;
  }
`
export const Text = styled(BaseText)``
export const Icon = styled(BaseIcon)`
  margin-right: 5px;
`
