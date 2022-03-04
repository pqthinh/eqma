import PropTypes from 'prop-types'
import React from 'react'
import {
  BodyWrapper, ContentBody, LayoutWrapper, Nav
} from './styled'

const WrapperContent = ({
  top,
  count,
  items,
  children,
  activeKey,
  setActiveKey,
  ...others
}) => {
  return (
      <ContentBody>
        {top}
        {items && (
          <Nav
            items={items}
            count={count}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        )}
        <LayoutWrapper>
          <BodyWrapper {...others}>{children}</BodyWrapper>
        </LayoutWrapper>
      </ContentBody>
  )
}

WrapperContent.propTypes = {
  top: PropTypes.element,
  count: PropTypes.array,
  contentBody: PropTypes.string,
  children: PropTypes.node,
  items: PropTypes.array,
  activeKey: PropTypes.any,
  setActiveKey: PropTypes.func
}

export default React.memo(WrapperContent)
