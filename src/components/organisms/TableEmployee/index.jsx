import { BasePagination, TextCell } from 'atoms'
import { useUser } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Notification, Table } from 'rsuite'
import {
  ButtonNotification,
  Cell,
  Column,
  FormEdit,
  Header,
  Icon,
  Modal,
  TextNotification,
  Toggle,
  Toolbar,
  Wrapper,
  WrapperIcon,
  WrapperIconButton
} from './styled'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const { onDeleteExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const history = useHistory()
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const remove = async id => {
    const result = await onDeleteExecute(EndPoint.get_emp(id))
    if (result) {
      showSuccess(`Đã xóa bản ghi id=${id}`)
      setReload(true)
    }
    setShowModalFormEdit(false)
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

  const _renderModalFormEmployee = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        header='Cập nhật thông tin nhân viên'
        body={
          <FormEdit employee={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormEmployee()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => history.push(`/report/employee/detail/${rowData.id}`)} ///report/employee/detail/
          appearance='subtle'
          icon={<Icon name='feather-eye' />}
        />
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
          appearance='subtle'
          icon={<Icon name='feather-edit' />}
        />
        <WrapperIconButton
          onClick={() => handleActive(rowData.id)}
          appearance='subtle'
          icon={<Icon name='feather-trash' />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const ToggleCell = ({ rowData, ...props }) => {
  const { user } = useUser()
  const changeStatus = useCallback(
    (id, status) => {
      console.log(id, status, 'product')
    },
    [user]
  )

  const handleActive = useCallback(
    (id, status) => {
      Notification['info']({
        title: 'Thay đổi trạng thái',
        duration: 10000,
        description: (
          <Wrapper>
            <TextNotification>
              Bạn muốn kích hoạt sản phẩm này ?
            </TextNotification>
            <Toolbar>
              <ButtonNotification
                onClick={() => {
                  Notification.close()
                  changeStatus(id, status)
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
    },
    [user]
  )

  return (
    <Cell {...props}>
      <Toggle
        active={rowData['status'] !== 'deactive'}
        onChange={() =>
          handleActive(
            rowData['id'],
            rowData['status'] === 'active' ? 'deactive' : 'active'
          )
        }
        checkedChildren={<Icon name='feather-check' />}
        unCheckedChildren={<Icon name='feather-x' />}
      />
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
  setReload,
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
          id='table-employee'
          height={window.innerHeight - 200}
          renderEmpty={() => {}}
          onRowClick={rowData => {
            console.log(rowData)
          }}
          {...others}
        >
          <Column width={60}>
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>
          <Column width={120}>
            <Header>Mã NV</Header>
            <TextCell dataKey='code' />
          </Column>
          <Column width={150}>
            <Header>Tên</Header>
            <TextCell dataKey='name' />
          </Column>
          <Column width={150}>
            <Header>Phòng ban</Header>
            <TextCell dataKey='department.name' />
          </Column>
          <Column width={150}>
            <Header>Người quản lý</Header>
            <TextCell dataKey='is_manager' />
          </Column>

          <Column width={200}>
            <Header>Email</Header>
            <TextCell dataKey='email' />
          </Column>
          <Column width={140}>
            <Header>SĐT</Header>
            <TextCell dataKey='phone_number' />
          </Column>
          <Column width={140}>
            <Header>Địa chỉ</Header>
            <TextCell dataKey='address' />
          </Column>

          <Column width={150} sortable>
            <Header>Ngày join</Header>
            <TextCell dataKey='join_date' />
          </Column>

          <Column width={120}>
            <Header>Kích hoạt</Header>
            <ToggleCell dataKey='status' setReload={setReload} />
          </Column>
          <Column width={120}>
            <Header>Hành động</Header>
            <ActionCell dataKey='id' setReload={setReload} {...others} />
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
ToggleCell.propTypes = {
  rowData: PropTypes.object,
  setReload: PropTypes.func
}
FormEdit.propTypes = {
  setReload: PropTypes.func
}

export default React.memo(TableEmployee)
