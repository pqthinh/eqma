import { BaseText, BaseImage } from 'atoms'
import { Container } from 'rsuite'
import styled from 'styled-components'

export const Wrapper = styled(Container)`
  display: flex;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.gray[5]};
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  margin: 10px;
  cursor: poiter;
`
export const Text = styled(BaseText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Image = styled(BaseImage)`
  object-fit: contain;
  width: 100%;
  max-height: 480px;
  max-width: 480px;
`
export const WrapperLeft = styled(Container)`
  text-align: left;
`
export const WrapperRight = styled(Container)`
  text-align: right;
`
