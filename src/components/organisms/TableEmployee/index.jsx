import { BasePagination, TextCell } from 'atoms'
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
  WrapperIconButton,
  WrapperImageCell
} from './styled'
import { useRequestManager, useUser } from 'hooks'
import { EndPoint } from 'config/api'

const ActionCell = ({ rowData, setReload, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const _renderModalFormProduct = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit product={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormProduct()}
      <WrapperIcon>
        <WrapperIconButton
          onClick={() => setShowModalFormEdit(true)}
          appearance='subtle'
          icon={<Icon name='feather-edit' />}
        />
      </WrapperIcon>
    </Cell>
  )
}

const ToggleCell = ({ rowData, setReload, ...props }) => {
  const { onPostExecute } = useRequestManager()
  const { user } = useUser()
  const changeStatus = useCallback(
    (id, status) => {
      console.log(id, status, 'product')
      async function execute(id, type) {
        let endPoint =
          type == 'active'
            ? EndPoint.ADMIN_ACTIVE_POST
            : EndPoint.ADMIN_BAN_POST
        const result = await onPostExecute(endPoint, {
          idProduct: id,
          idAdmin: user?.id
        })
        if (result) {
          setReload(true)
        }
      }
      execute(id, status)
    },
    [user]
  )

  const handleActive = useCallback(
    (id, status) => {
      Notification['info']({
        title: 'Kích hoạt sản phẩm',
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
        active={rowData['status'] === 'active'}
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
  setSort,
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

  const onSort = useCallback(
    sortType => {
      setSort({ key: sortType, type: sort.type == 'asc' ? 'desc' : 'asc' })
    },
    [sort, setSort]
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
          id='table-product'
          height={window.innerHeight - 220}
          {...others}
        >
          <Column width={150} align='center'>
            <Header>Image</Header>
            <WrapperImageCell dataKey='image' />
          </Column>
          <Column width={200}>
            <Header>Tên sp</Header>
            <TextCell dataKey='name' />
          </Column>
          <Column width={250}>
            <Header>Mô tả</Header>
            <TextCell dataKey='description' />
          </Column>
          <Column width={140} sortable>
            <Header>
              <span onClick={() => onSort('categoryName')}>Danh mục SP</span>
            </Header>
            <TextCell dataKey='categoryName' />
          </Column>
          <Column width={140}>
            <Header>Tên user</Header>
            <TextCell dataKey='username' />
          </Column>
          <Column width={140}>
            <Header>Email user</Header>
            <TextCell dataKey='email' />
          </Column>

          <Column width={100} sortable>
            <Header>
              <span onClick={() => onSort('price')}>Giá</span>
            </Header>
            <TextCell dataKey='price' />
          </Column>
          <Column width={60} sortable>
            <Header>
              <span onClick={() => onSort('quantity')}>SL</span>
            </Header>
            <TextCell dataKey='quantity' />
          </Column>
          <Column width={80} sortable>
            <Header>
              <span onClick={() => onSort('view')}>View </span>
            </Header>
            <TextCell dataKey='view' />
          </Column>
          <Column width={60} sortable>
            <Header>
              <span onClick={() => onSort('like_num')}>Like</span>
            </Header>
            <TextCell dataKey='like_num' />
          </Column>

          <Column width={150}>
            <Header>Địa điểm</Header>
            <TextCell dataKey='address' />
          </Column>

          <Column width={150} sortable>
            <Header>
              <span onClick={() => onSort('createdAt')}>Ngày đăng</span>
            </Header>
            <TextCell dataKey='createdAt' />
          </Column>

          <Column width={100}>
            <Header>Kích hoạt</Header>
            <ToggleCell dataKey='status' setReload={setReload} />
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
