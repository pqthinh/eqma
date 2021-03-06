import React from 'react'
import { Wrapper, WrapperModal, Body, Header } from './styled'
import PropTypes from 'prop-types'

const BaseModal = ({ size, header, body, footer, show, onHide, ...others }) => {
  if (!show) return null
  return (
    <Wrapper>
      <WrapperModal size={size} show={show} onHide={onHide} {...others}>
        <WrapperModal.Header><Header>{header}</Header></WrapperModal.Header>
        <Body>{body}</Body>
        <WrapperModal.Footer>{footer}</WrapperModal.Footer>
      </WrapperModal>
    </Wrapper>
  )
}

BaseModal.propTypes = {
  size: PropTypes.number,
  header: PropTypes.element,
  body: PropTypes.element,
  footer: PropTypes.element,
  show: PropTypes.bool,
  onHide: PropTypes.func
}

export default React.memo(BaseModal)
