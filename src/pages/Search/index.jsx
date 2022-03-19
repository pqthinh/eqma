import { IMAGES } from 'assets'
import { WrapperContentBody } from 'organisms'
import React from 'react'
import { Image, WrapperContent } from './styled'

function Search() {
  return (
    <WrapperContentBody top={null} contentBody={"Tìm kiếm"}>
      <WrapperContent>
        <Image source={IMAGES.NO_CONTENT.default} />
      </WrapperContent>
    </WrapperContentBody>
  )
}

export default Search