import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { WrapperErrorPage, Icon, Text, Contain } from './styled'

const NotFoundPage = ({ ...others }) => {
  const history = useHistory()
  const onGoBack = useCallback(() => {
    history.goBack()
  }, [])

  return (
    <WrapperErrorPage
      type={'notFound'}
      onTab={onGoBack}
      actionLabel={
        <Contain>
          <Icon name='feather-arrow-left-circle' />
          <Text>Quay lại</Text>
        </Contain>
      }
      {...others}
    />
  )
}

export default React.memo(NotFoundPage)
