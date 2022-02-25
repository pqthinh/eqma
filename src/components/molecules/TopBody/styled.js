import styled from 'styled-components'
import { BaseIcon, BaseContainer, BaseButton, BaseForm } from 'atoms'
import InputGroup from '../InputGroup'

export const Icon = styled(BaseIcon)``

export const Input = styled(InputGroup)``

export const Wrapper = styled(BaseContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  padding: 10px 20px;
  @media screen and (max-width: 980px) {
    margin: 0 10px;
  }
`

export const Button = styled(BaseButton)``

export const Form = styled(BaseForm)`
  width: 40%;
  .rs-input-group-addon {
    padding: 5px;
  }
`
