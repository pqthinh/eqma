import styled from 'styled-components'
import { Table } from 'rsuite'
import BaseDropdown from '../BaseDropdown'

export const WrapperPagination = styled(Table.Pagination)``
export const Dropdown = styled(BaseDropdown)`
  width: 100px;
  .rs-dropdown-menu {
    right: unset;
  }
`
