import { BasePagination, TextCell } from 'atoms'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Table, Notification } from 'rsuite'
import {
  Cell,
  Column,
  FormEdit,
  Header,
  Icon,
  Modal,
  Wrapper,
  WrapperIcon,
  WrapperIconButton,
  ButtonNotification,
  TextNotification,
  Toolbar
} from './styled'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const EquimentCell = ({ rowData, dataKey, ...props }) => {
  const history = useHistory()
  return (
    <Cell {...props} style={{cursor: "pointer"}} onClick={() => history.push(`/equipment/detail/${rowData.id}`)}>
      {rowData[dataKey]}
    </Cell>
  )
}

const ActionCell = ({ rowData, setReload, ...props }) => {

  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const { onDeleteExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const remove = async id => {
    const result = await onDeleteExecute(EndPoint.get_qreq(id))
    if (result) {
      showSuccess(`Đã xóa bản ghi id=${id}`)
      setReload(true)
    }
  }

  const handleActive = useCallback(id => {
    Notification['info']({
      title: 'Nhân viên',
      duration: 10000,
      description: (
        <Wrapper>
          <TextNotification>Bạn muốn xóa nhân viên này?</TextNotification>
          <Toolbar>
            <ButtonNotification
              onClick={async () => {
                Notification.close()
                await remove(id)
              }}
              success
            >
              Xác nhận
            </ButtonNotification>
            <ButtonNotification onClick={() => Notification.close()}>
              Hủy bỏ
            </ButtonNotification>
          </Toolbar>
        </Wrapper>
      )
    })
  }, [])

  const _renderModalFormProduct = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit erequest={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormProduct()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => handleActive(rowData.id)}
          appearance='subtle'
          icon={<Icon name='feather-trash' />}
        />
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
          appearance='subtle'
          icon={<Icon name='feather-edit' />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const TableEmployee = ({
  expData,
  totalRecord,
  page,
  setPage,
  limit,
  sort,
  // setSort,
  // setReload,
  ...others
}) => {
  const history = useHistory()
  const location = useLocation()
  const { search } = useLocation()

  const onLoadPage = useCallback(
    page => {
      setPage(page)
      history.push(location.pathname + '?page=' + page)
    },
    [page]
  )

  const onLoadParamPage = useCallback(() => {
    const page = new URLSearchParams(search).get('page')
    if (page) setPage(eval(page))
  }, [location.pathname])

  const _renderTable = useCallback(
    data => {
      return (
        <Table
          data={data}
          wordWrap
          id='table-erequest'
          height={window.innerHeight - 200}
          renderEmpty={() => {}}
          onRowClick={rowData => {
            console.log(rowData)
          }}
          {...others}
        >
          <Column width={60} align='center'>
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>
          <Column width={120} align='center'>
            <Header>Mã TB</Header>
            <EquimentCell dataKey='equipment_id' />
          </Column>
          <Column width={120} align='center'>
            <Header>Phí</Header>
            <TextCell dataKey='price' />
          </Column>
          <Column width={250}>
            <Header>Chi tiết</Header>
            <TextCell dataKey='details' />
          </Column>
          <Column width={120}>
            <Header>Loại yêu cầu</Header>
            <TextCell dataKey='type' type={true}/>
          </Column>
          <Column width={120}>
            <Header>Trạng thái</Header>
            <TextCell dataKey='status' status={true}/>
          </Column>

          <Column width={150} sortable>
            <Header>Ngày sửa</Header>
            <TextCell dataKey='start_date' />
          </Column>

          <Column width={150} sortable>
            <Header>Ngày trả</Header>
            <TextCell dataKey='end_date' />
          </Column>

          <Column width={120}>
            <Header>Hành động</Header>
            <ActionCell dataKey='id' {...others} />
          </Column>
        </Table>
      )
    },
    [window.innerHeight, sort]
  )

  useEffect(onLoadParamPage, [location.pathname])

  return (
    <Wrapper {...others}>
      {_renderTable(expData)}
      <BasePagination
        onChangePage={e => onLoadPage(e)}
        total={totalRecord}
        activePage={page}
        limit={limit}
      />
    </Wrapper>
  )
}

EquimentCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string
}

ActionCell.propTypes = {
  rowData: PropTypes.object,
  dataKey: PropTypes.string,
  showModalFormEdit: PropTypes.bool,
  setShowModalFormEdit: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func
}
TableEmployee.propTypes = {
  expData: PropTypes.array,
  totalRecord: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.any,
  setReload: PropTypes.func,
  limit: PropTypes.number,
  setSort: PropTypes.func,
  sort: PropTypes.any
}
FormEdit.propTypes = {
  setReload: PropTypes.func
}

export default React.memo(TableEmployee)
