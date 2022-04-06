import { BaseModal, BaseIcon, BaseButton, BaseForm } from 'atoms'
import styled from 'styled-components'

export const Modal = styled(BaseModal)`
  max-width: 760px;
  .rs-modal-content .rs-modal-body {
    min-height: 300px;
  }
`

export const Icon = styled(BaseIcon)``

export const Button = styled(BaseButton)`
  // height: 30px;
  // align-items: center;
`
export const Form = styled(BaseForm)`
  display: flex;
  justify-content:flex-end;
  align-items: center;
  .rs-form-group {
    margin: 0 10px !important;
  }
`
