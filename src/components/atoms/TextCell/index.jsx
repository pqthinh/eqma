import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'
import Constant from '../../../utils/Constants'

import { Text, WrapperCell } from './styled'

const TextCell = ({
  rowData,
  dataKey,
  status,
  type,
  equiqment,
  repair,
  ...others
}) => {
  return (
    <WrapperCell {...others}>
      <Text>
        {['ended_at', 'created_at'].indexOf(dataKey) >= 0
          ? withEmpty(dataKey, rowData).toDate()
          : type
          ? Constant.request_type[withEmpty(dataKey, rowData)]
          : status
          ? Constant.request_status[withEmpty(dataKey, rowData)]
          : equiqment
          ? Constant.equipment_status[withEmpty(dataKey, rowData)]
          : repair
          ? Constant.repair_status[withEmpty(dataKey, rowData)]
          : withEmpty(dataKey, rowData)}
      </Text>
    </WrapperCell>
  )
}

TextCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  status: PropTypes.bool,
  type: PropTypes.bool,
  equiqment: PropTypes.bool,
  repair: PropTypes.bool,
}

export default React.memo(TextCell)
