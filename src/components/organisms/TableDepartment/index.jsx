import { BasePagination, TextCell } from 'atoms'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Table } from 'rsuite'
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
  TextNotification,
  Toolbar,
  ButtonNotification
} from './styled'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const { onDeleteExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const remove = async id => {
    const result = await onDeleteExecute(EndPoint.get_dep(id))
    if (result) {
      showSuccess(`Đã xóa bản ghi id=${id}`)
      setReload(true)
    }
  }

  const handleActive = useCallback(id => {
    Notification['info']({
      title: 'Phòng ban',
      duration: 10000,
      description: (
        <Wrapper>
          <TextNotification>Bạn muốn xóa bộ phận này?</TextNotification>
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

  const _renderModalForm = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        header='Cập nhật thông tin bộ phận'
        body={
          <FormEdit
            department={rowData}
            type={'update'}
            setReload={setReload}
          />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalForm()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
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
          id='table-department'
          height={window.innerHeight - 200}
          renderEmpty={() => {}}
          onRowClick={rowData => {
            console.log(rowData)
          }}
          {...others}
        >
          <Column width={80} align='center'>
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>
          <Column width={150}>
            <Header>Tên</Header>
            <TextCell dataKey='name' />
          </Column>
          <Column width={80} align='center'>
            <Header>SL</Header>
            <TextCell dataKey='quantity' />
          </Column>
          <Column width={120} align='center'>
            <Header>Slug</Header>
            <TextCell dataKey='slug' />
          </Column>
          <Column width={150} align='center' sortable>
            <Header>Ngày tạo</Header>
            <TextCell dataKey='created_at' />
          </Column>

          <Column width={120} align='center'>
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
FormEdit.propTypes = {
  setReload: PropTypes.func
}

export default React.memo(TableEmployee)
