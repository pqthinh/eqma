import styled from 'styled-components'
import { Toggle } from 'rsuite'

export const Wrapper = styled.div`
  .rs-btn-toggle-checked {
    background: ${props => props.theme.colors.primary};
  }

  .rs-btn-toggle .rs-btn-toggle-inner svg {
    position: unset;
  }
`
export const WrapperToggle = styled(Toggle)``
