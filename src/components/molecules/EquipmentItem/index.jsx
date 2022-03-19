import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Text, Image, WrapperLeft, WrapperRight } from './styled'
import { withEmpty } from 'exp-value'
import { Whisper, Tooltip } from 'rsuite'

function EquipmentItem({ equi, type, ...others }) {
  const item = (title, value, slice = false) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <WrapperLeft>{title}</WrapperLeft>
        <WrapperRight>
          <Whisper
            placement='top'
            trigger='hover'
            controlId='control-id-hover'
            speaker={<Tooltip>{value}</Tooltip>}
          >
            <Text bold>
              {slice ? value.toString().slice(50) + '... ' : value}
            </Text>
          </Whisper>
        </WrapperRight>
      </div>
    )
  }

  return (
    <Wrapper
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}
      {...others}
    >
      <WrapperLeft style={{ width: type == 'liquidation' ? '60%' : '100%' }}>
        {item('Mã thiết bị:', withEmpty('equipment_id', equi))}
        {item('Nội dung:', withEmpty('details', equi), true)}
        {item('Ghi chú:', withEmpty('note', equi), true)}
        {item('Mã thiết bị:', withEmpty('equipment_id', equi))}
        {type == 'liquidation' || type == 'repair' ? (
          <>
            {item('Địa chỉ:', withEmpty('place', equi), true)}
            {item('Giá:', withEmpty('price', equi).toLocaleString('vi-VN'))}
          </>
        ) : null}
        {type == 'request' ? (
          <>
            {item('Loại:', withEmpty('type', equi))}
            {item('Ngày yêu cầu:', withEmpty('created_at', equi))}
            {item('Ngày đáp ứng:', withEmpty('updated_at', equi))}
          </>
        ) : null}
        {type == 'liquidation'
          ? item('Ngày đăng:', withEmpty('created_at', equi))
          : null}
        {type == 'repair' ? (
          <>
            {item('Trạng thái:', withEmpty('status', equi))}
            {item('Ngày sửa:', withEmpty('start_date', equi))}
            {item('Ngày hẹn trả:', withEmpty('end_date', equi))}
          </>
        ) : null}
      </WrapperLeft>

      {type == 'liquidation' ? (
        <WrapperRight
          style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image source={withEmpty('image', equi)} style={{ width: 120 }} />
        </WrapperRight>
      ) : null}
    </Wrapper>
  )
}
EquipmentItem.propTypes = {
  equi: PropTypes.any,
  type: PropTypes.any
}
export default EquipmentItem
