import styled from 'styled-components'
import { Uploader } from 'rsuite'

export const Wrapper = styled.div`
  flex: 1;
  flex-direction: ${props => props.direction};
`

export const WrapperUploader = styled(Uploader)`
  .rs-uploader-trigger {
    float: unset;
    svg {
      color: ${props => props.theme.colors.white};
    }
    .rs-uploader-trigger-btn {
      border: 0px;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${props => props.theme.colors.transparent};
      padding: 5px;
      margin: 0;
      font-size: 24px;
      &:before {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`
