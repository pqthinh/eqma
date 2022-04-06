import { BaseText, BaseImage, BaseButton, BaseIcon } from 'atoms'
import styled from 'styled-components'
import { FormLiquidation } from 'molecules'
export const WrapperContent = styled.div`
  display: block;
  width: 100%;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow: auto;
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
export const FormLiq = styled(FormLiquidation)`
  width: 100%;
`
export const Icon = styled(BaseIcon)``
export const Button = styled(BaseButton)``
