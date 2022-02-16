import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styled'

const BaseToggle = ({
  checked,
  onChange,// eslint-disable-next-line no-unused-vars
  handleOnChange,// eslint-disable-next-line no-unused-vars
  defaultNS,// eslint-disable-next-line no-unused-vars
  i18nOptions,// eslint-disable-next-line no-unused-vars
  reportNS,// eslint-disable-next-line no-unused-vars
  tReady,// eslint-disable-next-line no-unused-vars
  ...others
}) => {
  return (
    <Wrapper
      onChange={onChange}
      checked={checked}
      {...others}
    />
  )
}

BaseToggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  defaultNS: PropTypes.any,
  i18nOptions: PropTypes.any,
  reportNS: PropTypes.any,
  tReady: PropTypes.any,
  handleOnChange: PropTypes.func
}

export default React.memo(BaseToggle)
