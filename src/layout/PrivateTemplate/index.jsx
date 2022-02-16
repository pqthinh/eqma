import { Sidebar } from 'molecules'
import PropTypes from 'prop-types'
import React from 'react'
import { BodyWrapper, Wrapper, LayoutWrapper } from './styled'
function PrivateTemplate({ children, ...others }) {
  return (
    <Wrapper>
      <Sidebar />
      <LayoutWrapper>
        <BodyWrapper {...others}>{children}</BodyWrapper>
      </LayoutWrapper>
    </Wrapper>
  )
}

PrivateTemplate.propTypes = {
  children: PropTypes.any
}

export default PrivateTemplate
