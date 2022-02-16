import styled from 'styled-components'
import { BaseText, BaseButton, BaseImage } from 'atoms'

export const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Image = styled(BaseImage)`
  max-width: 400px;
  box-sizing: border-box;
  object-fit: contain
  width: 100%;
`

export const Description = styled(BaseText)`
  color: ${({ theme }) => theme.colors.gray[1]};
  margin-top: 20px;
`

export const ButtonWrapper = styled(BaseButton)`
  margin-top: 20px;
`
