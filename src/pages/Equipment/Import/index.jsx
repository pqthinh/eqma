import { WrapperContentBody } from 'organisms'
import React from 'react'
import { WrapperContent, FormEquimentImport } from './styled'

function ImportEquiment() {
  return (
    <WrapperContentBody top={null} contentBody={"Nhập thiết bị"}>
      <WrapperContent>
        <FormEquimentImport type="create"/>
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default ImportEquiment