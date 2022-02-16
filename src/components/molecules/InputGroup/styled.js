import styled from 'styled-components'
import { FormGroup, ControlLabel, FormControl, InputGroup, Icon } from 'rsuite'
import { BaseText } from 'atoms'

export const Wrapper = styled(FormGroup)`
  margin: 10px 0;
`

export const Label = styled(ControlLabel)`
  ${props =>
    props.bold &&
    `font-weight: 700 ;
    margin: 15px 0 ;`};
  display: flex !important;
`
export const Control = styled(FormControl)`
  border-radius: 5px;
  height: max-content;
  align-item: center;
  padding: 7px 4px;
  text-overflow: ellipsis; /* IE, Safari (WebKit) */
  overflow: hidden; /* don't show excess chars */
  white-space: nowrap;
  outline: none;
  &.rs-input[disabled] {
    cursor: not-allowed;
    color: unset;
    background: unset;
  }
`
export const Input = styled(InputGroup)`
  overflow: visible;
  display: flex;
  align-items: center;
  border: 1px solid #e5e5ea;
  border-radius: 4px;
  outline: none;
`

export const InputAddon = styled(Input.Addon)`
  display: flex;
  align-items: center;
  width: max-content;
  margin: 0;
  border-radius: 4px;
  outline: none;
  background: ${props =>
    props.children.props.background
      ? props.children.props.background || props.theme.colors.background
      : props.theme.colors.transparent};
`
export const TextRequire = styled(BaseText)`
  color: ${props => props.theme.colors.red[0]};
  margin-left: 10px;
`

export const IconContainer = styled(Icon)``
