import { BasePagination, TextCell } from 'atoms'
import { EndPoint } from 'config/api'
import { useAlert, useRequestManager } from 'hooks'
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
  WrapperIconButton
} from './styled'

const ActionCell = ({ rowData, setReload, appr, ...props }) => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false)
  const { onPutExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const hideModal = useCallback(() => {
    setShowModalFormEdit(false)
  }, [showModalFormEdit])

  const _renderModalFormProduct = useCallback(() => {
    return (
      <Modal
        show={showModalFormEdit}
        onHide={hideModal}
        body={
          <FormEdit request={rowData} type={'update'} setReload={setReload} />
        }
      />
    )
  }, [showModalFormEdit])

  const changeStatus = status => {
    async function execute(data) {
      const result = await onPutExecute(EndPoint.updel_req(data.id), data)
      if (result) {
        showSuccess(status == 2 ? 'Duyệt thành công' : 'Hủy thành công')
        setReload(true)
      }
      setShowModalFormEdit(false)
    }
    execute({ ...rowData, status })
  }

  return (
    <Cell {...props}>
      {showModalFormEdit && _renderModalFormProduct()}
      <WrapperIcon>
        {appr ? (
          <>
            <WrapperIconButton
              onClick={() => changeStatus(2)}
              appearance='subtle'
              icon={<Icon name='feather-check-square' />}
              disable={rowData['status'] != 1}
            />
            <WrapperIconButton
              onClick={() => changeStatus(3)}
              appearance='subtle'
              icon={<Icon name='feather-alert-octagon' />}
              disable={rowData['status'] == 3}
            />
          </>
        ) : (
          <>
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
          </>
        )}
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
          id='table-req'
          height={window.innerHeight - 200}
          renderEmpty={() => {}}
          {...others}
        >
          <Column width={60}>
            <Header>ID</Header>
            <TextCell dataKey='id' />
          </Column>
          <Column width={80}>
            <Header>Mã TB</Header>
            <TextCell dataKey='equipment_id' />
          </Column>
          <Column width={60}>
            <Header>Mã NV</Header>
            <TextCell dataKey='employee_id' />
          </Column>

          <Column width={250}>
            <Header>Chi tiết</Header>
            <TextCell dataKey='details' />
          </Column>
          <Column width={100}>
            <Header>Hình thức</Header>
            <TextCell dataKey='type' type={true} />
          </Column>
          <Column width={100}>
            <Header>Trạng thái</Header>
            <TextCell dataKey='status' status={true} />
          </Column>

          <Column width={150} sortable>
            <Header>Ngày yêu cầu</Header>
            <TextCell dataKey='start_date' />
          </Column>

          <Column width={150} sortable>
            <Header>Ngày đáp ứng</Header>
            <TextCell dataKey='end_date' />
          </Column>
          <Column width={100} >
            <Header>Phí</Header>
            <TextCell dataKey='price' />
          </Column>
          <Column width={120} align="center">
            <Header>Duyệt yêu cầu</Header>
            <ActionCell dataKey='id' appr={true} {...others} />
          </Column>
          <Column width={120} align='center'>
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
  setReload: PropTypes.func,
  appr: PropTypes.bool
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
