import React from 'react'
import { Sidebar } from 'components'
import { Container } from './styled'
import PropTypes from 'prop-types'

function PrivateTemplate({ children }) {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  )
}

PrivateTemplate.propTypes = {
  children: PropTypes.any
}

export default PrivateTemplate
