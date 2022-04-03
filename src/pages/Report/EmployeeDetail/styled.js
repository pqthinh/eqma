import { BaseImage, BaseButton, BaseIcon, BaseText } from 'atoms'
import { WrapperContentBody } from 'organisms'
import styled from 'styled-components'
import { Container } from 'rsuite'

export const ContentBody = styled(WrapperContentBody)``

export const Content = styled.div`
  display: block !important;
  width: 100%;
  height: calc(100vh - 150px);
  text-align: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
`
export const Image = styled(BaseImage)`
  object-fit: contain;
  width: 100%;
  max-height: 480px;
  max-width: 480px;
`

export const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`
export const Icon = styled(BaseIcon)`
  width: 20px;
`
export const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.gray[5]};
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`
export const Text = styled(BaseText)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const WrapperLeft = styled(Container)`
  flex: 2;
`
export const WrapperRight = styled(Container)`
  flex: 3;
`
export const WrapperItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
`
