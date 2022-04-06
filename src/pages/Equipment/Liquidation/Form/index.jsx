import { WrapperContentBody } from 'organisms'
import React from 'react'
import { WrapperContent, FormLiq, Button, Icon } from './styled'
import { useHistory } from 'react-router-dom'

function FormLiquidation() {
  const history = useHistory()
  return (
    <WrapperContentBody top={null} contentBody={'Thanh lý thiết bị'}>
      <WrapperContent>
        <Button
          appearance='primary'
          onClick={() => history.push('/equipment/list')}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Icon name='feather-arrow-left' />
          Quay lại
        </Button>
        <FormLiq type='create' />
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default FormLiquidation
