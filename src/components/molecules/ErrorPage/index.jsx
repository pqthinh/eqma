import React, { useCallback } from 'react'
import { Wrapper, Image, Description, ButtonWrapper } from './styled'
import { withNull, withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import { IMAGES } from 'assets'

const ErrorPage = ({ type, description, onTab, actionLabel, ...others }) => {
  const images = {
    notFound: {
      url: IMAGES.NOTFOUND_IMAGE.default,
      description: 'Trang này không tồn tại hoặc đã bị xoá.'
    },
    noData: {
      url: IMAGES.NO_CONTENT.default,
      description: 'Không có dữ liệu.'
    }
  }

  const renderThumb = useCallback(() => {
    const imgUrl = withNull('url', images[type]) || IMAGES.FAIL_IMAGE.default
    return <Image source={imgUrl} />
  }, [type])

  return (
    <Wrapper {...others}>
      {renderThumb()}
      <Description>
        {description || withEmpty('description', images[type])}
      </Description>
      {onTab && (
        <ButtonWrapper onClick={onTab}>{actionLabel || 'Label'}</ButtonWrapper>
      )}
    </Wrapper>
  )
}

ErrorPage.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
  onTab: PropTypes.func,
  actionLabel: PropTypes.element
}

export default React.memo(ErrorPage)
