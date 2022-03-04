import { BaseImage } from 'atoms'
import { WrapperContentBody } from 'organisms'
import styled from 'styled-components'
export const ContentBody = styled(WrapperContentBody)``

export const Wrapper = styled.div`
  display: block;
`
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
