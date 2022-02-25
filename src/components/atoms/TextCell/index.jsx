import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'

import { Text, WrapperCell } from './styled'

const TextCell = ({ rowData, dataKey, ...others }) => {
  return (
    <WrapperCell {...others}>
      <Text>
        {['ended_at', 'created_at'].indexOf(dataKey) >= 0
          ? withEmpty(dataKey, rowData).toDate()
          : withEmpty(dataKey, rowData)}
      </Text>
    </WrapperCell>
  )
}

TextCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string
}

export default React.memo(TextCell)
