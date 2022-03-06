import { BaseText, BaseImage } from 'atoms'
import styled from 'styled-components'

export const WrapperContent = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const Image = styled(BaseImage)`
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  object-fit: contain;
`
