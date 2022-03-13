import styled from 'styled-components'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  Icon,
  SelectPicker
} from 'rsuite'
import { BaseText } from 'atoms'

export const Wrapper = styled(FormGroup)`
  margin: 10px 0;
  font-size: 13px;
`

export const Label = styled(ControlLabel)`
  ${props =>
    props.bold &&
    `font-weight: 700 ;
    margin: 15px 0 ;`};
  display: flex !important;
  font-size: 13px;
`
export const Control = styled(FormControl)`
  border-radius: 5px;
  height: max-content;
  align-item: center;
  padding: 4px;
  text-overflow: ellipsis; /* IE, Safari (WebKit) */
  overflow: hidden; /* don't show excess chars */
  white-space: nowrap;
  outline: none;
  font-size: 12px;
  &.rs-input[disabled] {
    cursor: not-allowed;
    color: unset;
    background: unset;
  }
  input {
    border: 0;
  }
`
export const Picker = styled(SelectPicker)`
  outline: none;
  font-size: 12px;
  width: 100%;
  .rs-picker-toggle {
    border: 0;
    font-size: 12px;
    padding: 4px;
  }
  &.rs-picker-select[disabled] {
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
  textarea {
    width: 100%;
    border-width: 0;
    padding: 10px 5px;
    white-space: pre;
  }
`

export const InputAddon = styled(Input.Addon)`
  display: flex;
  align-items: center;
  width: max-content;
  margin: 0;
  padding: 5px;
  border-radius: 4px;
  outline: none;
  background: ${props =>
    props.children.props.background
      ? props.children.props.background || props.theme.colors.background
      : props.theme.colors.transparent};
  svg {
    width: 18px;
    height: 18px;
  }
`
export const TextRequire = styled(BaseText)`
  color: ${props => props.theme.colors.red[0]};
  margin-left: 10px;
`

export const IconContainer = styled(Icon)``
