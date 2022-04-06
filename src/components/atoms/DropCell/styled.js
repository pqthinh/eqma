import styled from 'styled-components'
import { Table } from 'rsuite'
const { Cell } = Table

export const WrapperCell = styled(Cell)`
  .rs-table-cell-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`
