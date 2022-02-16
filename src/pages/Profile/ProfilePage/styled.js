import { BaseButton, BaseText, BaseIcon, BaseImage } from 'atoms'
import { WrapperContentBody } from 'organisms'
import styled from 'styled-components'

export const ContentBody = styled(WrapperContentBody)``

export const Wrapper = styled.div`
  margin: 10px;
  display: block;
`
export const WrapperContent = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const Button = styled(BaseButton)`
  border-radius: 4px;
`
export const Icon = styled(BaseIcon)``
export const Image = styled(BaseImage)`
  object-fit: contain;
  width: 100%;
  max-height: 480px;
  max-width: 480px;
`
