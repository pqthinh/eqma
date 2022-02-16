import React from 'react'
import { WrapperNav, ContentItem, NavItem, Icon, Wrapper } from './styled'
import PropTypes from 'prop-types'
import { withBoolean, withNull, withNumber } from 'exp-value'

const BaseNav = ({ count, activeKey, setActiveKey, items, ...others }) => {
  const _renderItem = React.useCallback(() => {
    return items?.map((item, index) => (
      <NavItem
        key={index + 1}
        active={eval(activeKey) == index + 1}
        onClick={() => setActiveKey(index + 1)}
      >
        <Wrapper>
          {withBoolean('iconName', item) && (
            <Icon name={withNull('iconName', item)} size={18} />
          )}
          {withNumber('length', count) > 0 ? (
            <ContentItem>{`${withNull('contentName', item) || item} (${
              count[index] || 0
            })`}</ContentItem>
          ) : (
            <ContentItem>{withNull('contentName', item) || item}</ContentItem>
          )}
        </Wrapper>
      </NavItem>
    ))
  }, [items, activeKey, count])

  return (
    <WrapperNav appearance='subtle' {...others}>
      {_renderItem()}
    </WrapperNav>
  )
}

BaseNav.propTypes = {
  items: PropTypes.array.isRequired,
  count: PropTypes.array,
  activeKey: PropTypes.any.isRequired,
  setActiveKey: PropTypes.func
}

export default React.memo(BaseNav)
