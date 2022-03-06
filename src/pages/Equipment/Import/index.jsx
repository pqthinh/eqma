import { IMAGES } from 'assets'
import { WrapperContentBody } from 'organisms'
import React from 'react'
import { Constants } from 'utils'
import { Image, WrapperContent } from './styled'

function ImportEquiment() {
  return (
    <WrapperContentBody top={null} contentBody={Constants.contentPage[1].title}>
      <WrapperContent>
        <Image source={IMAGES.NO_CONTENT.default} />
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default ImportEquiment