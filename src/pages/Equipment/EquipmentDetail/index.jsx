import React, { useCallback, useState, useEffect } from 'react'
import NotFoundPage from '../../NotFoundPage'
import {
  Content,
  ContentBody,
  Button,
  Icon,
  Wrapper,
  Image,
  WrapperLeft,
  WrapperRight,
  Text,
  WrapperItem
} from './styled'
import { useRequestManager, useAlert } from 'hooks'
import { withArray, withEmpty } from 'exp-value'
import { EndPoint } from 'config/api'
import { useHistory, useParams } from 'react-router-dom'
import { FlexboxGrid, Divider } from 'rsuite'
import { EquipmentItem } from 'molecules'
import { IMAGES } from 'assets'
import { Whisper, Tooltip } from 'rsuite'
import { Constants } from 'utils'

const EquipmentDetail = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const [info, setInfo] = useState()
  const [request, setRequest] = useState()
  const [liquidation, setLiquidation] = useState()
  const [status_log, setStatus_log] = useState()
  const [repair, setRepair] = useState()

  const { onGetExecute } = useRequestManager()
  const { showError } = useAlert()
  const history = useHistory()
  const { id } = useParams()

  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const getEqui = useCallback(() => {
    async function execute() {
      const result = await onGetExecute(EndPoint.get_equ(id))
      if (result) {
        setInfo(result)
        setRequest(withArray('request', result))
        setLiquidation(withArray('liquidation', result))
        setStatus_log(withArray('status_log', result))
        setRepair(withArray('repair', result))
      } else {
        showError('Lấy dữ liệu thiết bị không thành công')
      }
    }
    execute()
  }, [id])

  useEffect(getEqui, [id])

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
              {slice ? value.toString().slice(0, 50) + '... ' : value}
            </Text>
          </Whisper>
        </WrapperRight>
      </div>
    )
  }

  // eslint-disable-next-line
  const RowItem = ({ data, type, ...rest }) => {
    return (
      <Wrapper
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
        {...rest}
      >
        {/* eslint-disable-next-line */}
        {Array.isArray(data) && data.length > 0 ? (
          [...data].map((equi, index) => (
            <EquipmentItem equi={equi} key={index} type={type} />
          ))
        ) : (
          <Image source={IMAGES.nopost.default} style={{ padding: 100 }} />
        )}
      </Wrapper>
    )
  }

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return <RowItem data={request} type='request' />
    }
    if (activeKeyNav == '2') {
      return <RowItem data={liquidation} type='liquidation' />
    }
    if (activeKeyNav == '3') {
      return <RowItem data={repair} type='repair' />
    }
    if (activeKeyNav == '4') {
      return <RowItem data={status_log} type='status_log' />
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  const InfoEmp = () => {
    return (
      <Wrapper style={{ borderBottom: 0 }}>
        <FlexboxGrid justify='start'>
          <FlexboxGrid.Item colspan={4}>
            <Button
              appearance='primary'
              onClick={() => history.push('/equipment/list')}
            >
              <Icon name='feather-arrow-left' />
              Quay lại
            </Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>
            <Button appearance='secondary' onClick={getEqui}>
              <Icon name='feather-refresh-cw' />
              Làm mới
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider>Thông tin thiết bị</Divider>
        <WrapperItem style={{ padding: 20 }}>
          <WrapperLeft>
            {item('Tên thiết bị: ', withEmpty('name', info), true)}
            {item('Mã danh mục: ', withEmpty('category_id', info))}
            {item('Giá: ', withEmpty('price', info).toLocaleString('vi-VN'))}
            {item(
              'Trạng thái: ',
              Constants.equipment_status[withEmpty('status.type', info) || 5]
            )}
            {item('Ngày nhập: ', withEmpty('created_at', info))}
            {item('Ghi chú: ', withEmpty('notes', info), true)}
          </WrapperLeft>
          <WrapperRight
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Image
              source={withEmpty('image', info)}
              style={{ height: 120, width: 120 }}
            />
          </WrapperRight>
        </WrapperItem>

        <Divider />
      </Wrapper>
    )
  }

  return (
    <ContentBody
      contentBody={'Thông tin thiết bị'}
      items={[
        { contentName: 'Lịch sử yêu cầu', iconName: 'feather-book' },
        { contentName: 'Lịch sử thanh lý', iconName: 'feather-shopping-bag' },
        { contentName: 'Lịch sử sửa chữa', iconName: 'feather-tool' },
        { contentName: 'Lịch sử sử dụng', iconName: 'feather-loader' }
      ]}
      activeKey={activeKeyNav}
      setActiveKey={onSelect}
      top={<InfoEmp />}
    >
      <Content>{_renderContentPage()}</Content>
    </ContentBody>
  )
}

EquipmentDetail.propTypes = {}

export default EquipmentDetail
