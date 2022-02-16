import React from 'react'
import {
  Wrapper,
  Label,
  Control,
  Input,
  InputAddon,
  TextRequire
} from './styled'
import PropTypes from 'prop-types'

const InputGroup = ({
  label,
  bold,
  name,
  value,
  onChange,
  accepter,
  leftIcon,
  rightIcon,
  placeholder,
  require,
  ...rest
}) => {
  return (
    <Wrapper>
      <Label className='label' bold={bold ? 1 : 0}>
        {label}
        {require ? <TextRequire>(*)</TextRequire> : null}
      </Label>
      <Input>
        {leftIcon ? <InputAddon>{leftIcon}</InputAddon> : null}
        <Control
          name={name}
          value={value}
          onChange={onChange}
          accepter={accepter}
          placeholder={placeholder}
          {...rest}
        />
        {rightIcon ? <InputAddon>{rightIcon}</InputAddon> : null}
      </Input>
    </Wrapper>
  )
}

InputGroup.propTypes = {
  label: PropTypes.string,
  bold: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  accepter: PropTypes.object,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  placeholder: PropTypes.string,
  require: PropTypes.bool
}

export default React.memo(InputGroup)
