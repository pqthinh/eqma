import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React from 'react'
import Constant from '../../../utils/Constants'
import { Button, Form, Icon, Input, Wrapper } from './styled'
import { SelectPicker } from 'rsuite'

const TopBody = ({
  search,
  setSearch,
  status,
  buttonAction,
  disableAdd,
  disableSearch,
  placeholder = 'Tìm kiếm ...',
  dropdown = null,
  children,
  filter,
  handleChangeFilter,
  submit,
  se,
  ...others
}) => {
  return (
    <Wrapper {...others}>
      <Form fluid>
        <Input
          value={search}
          onChange={e => setSearch(e)}
          placeholder={
            status === 1
              ? 'Tìm kiếm bằng tên, SĐT, email...'
              : status === 2
              ? 'Tìm kiếm bằng mã đơn, SĐT...'
              : status === 3
              ? 'Tìm kiếm'
              : placeholder
          }
          name={'search'}
          rightIcon={<Icon name={'feather-search'} />}
          disabled={disableSearch}
        />
        {se && se.equipment_code ? (
          <Input
            value={withEmpty('equipment_code', filter)}
            onChange={e => handleChangeFilter('equipment_code', e)}
            placeholder={'Mã thiết bị'}
            name={'equipment_code'}
            leftIcon={<Icon name={'feather-bookmark'} />}
          />
        ) : null}
        {se && se.employee_code ? (
          <Input
            value={withEmpty('employee_code', filter)}
            onChange={e => handleChangeFilter('employee_code', e)}
            placeholder={'Mã nv'}
            name={'employee_code'}
            leftIcon={<Icon name={'feather-user'} />}
          />
        ) : null}
        {se && se.type ? (
          <Input
            data={[{ value: '', label: 'Tất cả' }, ...Constant.dropdown_rtype]}
            value={withEmpty('type', filter) || 0}
            onChange={value => handleChangeFilter('type', value)}
            placeholder={'Hình thức'}
            name={'type'}
            leftIcon={<Icon name={'feather-align-justify'} />}
            placement='autoVerticalStart'
            accepter={SelectPicker}
            searchable={false}
            size='sm'
          />
        ) : null}
        {se && se.status ? (
          <Input
            data={Constant.dropdown_status}
            value={withEmpty('status', filter) || 0}
            onChange={value => handleChangeFilter('status', value)}
            placeholder={'Trạng thái'}
            name={'status'}
            leftIcon={<Icon name={'feather-align-justify'} />}
            placement='autoVerticalStart'
            accepter={SelectPicker}
            searchable={false}
            size='sm'
          />
        ) : null}
        {typeof submit == 'function' ? (
          <Button
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={submit}
          >
            Lọc
            <Icon name='filter' />
          </Button>
        ) : null}
      </Form>
      {typeof buttonAction === 'function' && (
        <Button onClick={buttonAction} disabled={disableAdd}>
          Thêm mới
        </Button>
      )}
      {dropdown}
      {children}
    </Wrapper>
  )
}

TopBody.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  status: PropTypes.number,
  buttonAction: PropTypes.func,
  disableAdd: PropTypes.bool,
  disableSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  dropdown: PropTypes.any,
  children: PropTypes.any,
  handleChangeFilter: PropTypes.func,
  filter: PropTypes.any,
  submit: PropTypes.func,
  se:  PropTypes.any,
}

export default React.memo(TopBody)
