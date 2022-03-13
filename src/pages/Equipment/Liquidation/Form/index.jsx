import { WrapperContentBody } from 'organisms'
import React from 'react'
import { WrapperContent, FormLiq } from './styled'

function FormLiquidation() {
  return (
    <WrapperContentBody top={null} contentBody={"Thanh lý thiết bị"}>
      <WrapperContent>
        <FormLiq type="create"/>
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default FormLiquidation