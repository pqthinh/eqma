import { Table } from 'rsuite'
import styled from 'styled-components'
import BaseImage from '../BaseImage'
const { Cell } = Table

export const Image = styled(BaseImage)``
export const WrapperImageCell = styled(Cell)`
  img {
    object-fit: cover;
    width: 100%;
    border-radius: 50%;
  }
`
