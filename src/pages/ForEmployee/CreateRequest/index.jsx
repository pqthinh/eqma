import { WrapperContentBody } from 'organisms'
import React from 'react'
import { WrapperContent, EmployeeRequest } from './styled'

function CreateRequest() {
  return (
    <WrapperContentBody top={null} contentBody={"Tạo yêu cầu"}>
      <WrapperContent>
        <EmployeeRequest type="create"/>
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default CreateRequest