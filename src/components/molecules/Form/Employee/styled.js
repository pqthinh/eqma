import {
  BaseButton,
  BaseForm,
  BaseIcon,
  BaseWrapper,
  BaseImage,
  BaseUploader,
  BaseText,
  Loading
} from 'atoms'

import { Container } from 'rsuite'
import styled from 'styled-components'

export const Button = styled(BaseButton)`
  width: 50%;
`

export const Form = styled(BaseForm)``
export const Icon = styled(BaseIcon)`
  width: 20px;
`

export const LayoutWrapper = styled(Container)`
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  width: 95%;
`

export const Wrapper = styled(BaseWrapper)`
  text-align: center;
  margin: 40px auto;
`

export const Title = styled(BaseText)`
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  margin: 40px auto;
`
export const WrapperLoading = styled(Loading)``
export const Drag = styled(BaseUploader)`
  min-height: 150px;
  width: 100%;
  .rs-uploader-trigger-btn {
    min-height: 150px;
    width: 100% !important;
  }
`
export const DragText = styled(BaseText)`
  font-weight: bold;
`
export const Image = styled(BaseImage)`
  width: 100% !important;
  object-fit: contain;
`
