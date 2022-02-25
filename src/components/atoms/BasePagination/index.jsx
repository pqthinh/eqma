import React from 'react'
import { WrapperPagination, Dropdown } from './styled'
import PropTypes from 'prop-types'

const BasePagination = ({ page, totalRecord, onChangePage, ...rest }) => {
  return (
    <WrapperPagination
      activePage={page}
      displayLength={10}
      total={totalRecord}
      renderLengthMenu={() => {
        return <Dropdown items={[10]} title={10} placement='topStart' />
      }}
      renderTotal={() => {
        return 'Trang'
      }}
      onChangePage={onChangePage}
      {...rest}
    />
  )
}
BasePagination.propTypes = {
  page: PropTypes.number,
  totalRecord: PropTypes.number,
  onChangePage: PropTypes.func
}
export default React.memo(BasePagination)
