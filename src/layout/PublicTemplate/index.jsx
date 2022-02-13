import React from 'react'
import PropTypes from 'prop-types'

function PublicTemplate({ children }) {
  return <div>{children}</div>
}

PublicTemplate.propTypes = {
  children: PropTypes.any
}

export default PublicTemplate
