import styled from 'styled-components'
import { Table } from 'rsuite'
const { Cell } = Table

export const Text = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`
export const WrapperCell = styled(Cell)`
  .rs-table-cell-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
