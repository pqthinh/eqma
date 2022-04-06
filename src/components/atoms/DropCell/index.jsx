import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'
import { SelectPicker } from 'rsuite'
import { WrapperCell } from './styled'

const DropCell = ({ data, rowData, dataKey, ...others }) => {
  return (
    <WrapperCell {...others}>
        <SelectPicker
          data={data}
          value={withEmpty(dataKey, rowData)}
          onChange={value => console.log('type', value)}
          placement='autoVerticalStart'
          searchable={false}
          cleanable={false}
          size='sm'
        />
    </WrapperCell>
  )
}

DropCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  data: PropTypes.any
}

export default React.memo(DropCell)
