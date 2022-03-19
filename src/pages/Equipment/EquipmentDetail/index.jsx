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
import { withArray, withObject, withEmpty } from 'exp-value'
import { EndPoint } from 'config/api'
import { useHistory, useParams } from 'react-router-dom'
import { FlexboxGrid, Divider } from 'rsuite'
import { EquipmentItem } from 'molecules'
import { IMAGES } from 'assets'

const EquipmentDetail = () => {
  const [activeKeyNav, setActiveKeyNav] = useState('1')
  const [info, setInfo] = useState()
  const [request, setRequest] = useState()
  const [liquidation, setLiquidation] = useState()

  const { onGetExecute } = useRequestManager()
  const { showError } = useAlert()
  const history = useHistory()
  const { id } = useParams()

  const onSelect = useCallback(e => setActiveKeyNav(e), [activeKeyNav])

  const getEmp = useCallback(() => {
    async function execute() {
      const result = await onGetExecute(EndPoint.get_equ(id))
      if (result) {
        setInfo(withObject('data', result))
        setRequest(withArray('data.request', result))
        setLiquidation(withArray('data.liquidation', result))
      } else {
        showError('Lấy dữ liệu thiết bị không thành công')
      }
    }
    execute()
  }, [id])

  useEffect(getEmp, [id])

  // eslint-disable-next-line
  const RowItem = ({ data, type, ...rest }) => {
    return (
      <Wrapper style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}} {...rest}>
        {Array.isArray(data) ? (
          [...data].map((equi, index) => (
            <EquipmentItem equi={equi} key={index} type={type} />
          ))
        ) : (
          <Image source={IMAGES.nopost.default} style={{padding: 100}}/>
        )}
      </Wrapper>
    )
  }

  const _renderContentPage = useCallback(() => {
    if (activeKeyNav == '1') {
      return <RowItem data={request} type="request"/>
    }
    if (activeKeyNav == '2') {
      return <RowItem data={liquidation} type="liquidation"/>
    }
    return <NotFoundPage />
  }, [activeKeyNav])

  // eslint-disable-next-line
  const Item = ({ title, value, ...others }) => {
    return (
      <WrapperItem {...others}>
        <WrapperLeft>{title}</WrapperLeft>
        <WrapperRight>
          <Text bold>{value}</Text>
        </WrapperRight>
      </WrapperItem>
    )
  }

  const InfoEmp = () => {
    return (
      <Wrapper style={{ borderBottom: 0 }}>
        <FlexboxGrid justify='start'>
          <FlexboxGrid.Item colspan={4}>
            <Button
              appearance='primary'
              onClick={() => history.push('/report/employee')}
            >
              <Icon name='feather-arrow-left' />
              Quay lại
            </Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>
            <Button appearance='secondary'>
              <Icon name='feather-refresh-cw' />
              Làm mới
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider>Thông tin thiết bị</Divider>
        <WrapperItem style={{padding: 20}}>
          <WrapperLeft>
            <Item title='Tên nhân viên: ' value={withEmpty('name', info)} />
            <Item title='Email: ' value={withEmpty('email', info)} />
            <Item title='Địa chỉ: ' value={withEmpty('address', info)} />
            <Item title='Sđt: ' value={withEmpty('phone_number', info)} />
            <Item
              title='Ngày tham gia: '
              value={withEmpty('join_date', info).toDate()}
            />
            <Item
              title='Phòng ban: '
              value={
                `(${withEmpty('department.id', info)}) ` +
                withEmpty('department.name', info)
              }
            />
          </WrapperLeft>
          <WrapperRight style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image
              source={IMAGES.AVATAR.default}
              style={{ height: 120, width: 120, borderRadius: '50%' }}
            />
          </WrapperRight>
        </WrapperItem>

        <Divider />
      </Wrapper>
    )
  }

  return (
    <ContentBody
      contentBody={'Thông tin nhân viên'}
      items={[
        { contentName: 'Lịch sử yêu cầu', iconName: 'feather-book' },
        { contentName: 'Lịch sử thanh lý', iconName: 'feather-shopping-bag' }
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
