import { BaseButton, BaseForm, BaseIcon, BaseText } from 'atoms'
import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 10px;
  display: block;
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const Button = styled(BaseButton)`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  div {
    color: ${props => props.theme.colors.white};
  }
  svg {
    margin-left: 10px;
  }

  &:hover {
    color: ${props => props.theme.colors.gray[1]};
    svg {
      color: ${props => props.theme.colors.gray[1]};
    }
  }
`
export const Icon = styled(BaseIcon)``
export const Form = styled(BaseForm)`
  min-width: 300px;
`
