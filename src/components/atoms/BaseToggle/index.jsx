import React from 'react'
import { Wrapper, WrapperToggle } from './styled'
import PropTypes from 'prop-types'

const BaseToggle = ({ active=true, ...others }) => {
  return (
    <Wrapper>
      <WrapperToggle {...others} checked={active ? true : false} />
    </Wrapper>
  )
}

BaseToggle.propTypes = {
  children: PropTypes.any,
  active: PropTypes.bool
}

export default React.memo(BaseToggle)
