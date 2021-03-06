import PropTypes from 'prop-types'
import React from 'react'
import {
  Control,
  Input,
  InputAddon,
  Label,
  TextRequire,
  Wrapper
} from './styled'

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
  type,
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
          type={type}
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
  value: PropTypes.any,
  onChange: PropTypes.func,
  accepter: PropTypes.object,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  placeholder: PropTypes.string,
  require: PropTypes.bool,
  type: PropTypes.any
}

export default React.memo(InputGroup)
