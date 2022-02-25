import PropTypes from 'prop-types'
import React from 'react'
import { Button, Form, Icon, Input, Wrapper } from './styled'

const TopBody = ({
  search,
  setSearch,
  status,
  buttonAction,
  disableAdd,
  disableSearch,
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
              ? 'Tìm kiếm bằng tên, số điện thoại, email...'
              : status === 2
              ? 'Tìm kiếm bằng mã đơn, số điện thoại...'
              : status === 3
              ? 'Tìm kiếm bằng tên bài đăng ...'
              : status === 4
              ? 'Tìm kiếm bằng tên sản phẩm ...'
              : 'Tìm kiếm ...'
          }
          name={'search'}
          rightIcon={<Icon name={'feather-search'} />}
          disabled={disableSearch}
        />
      </Form>
      {typeof buttonAction === 'function' && (
        <Button onClick={buttonAction} disabled={disableAdd}>
          THÊM MỚI
        </Button>
      )}
    </Wrapper>
  )
}

TopBody.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  status: PropTypes.number,
  buttonAction: PropTypes.func,
  disableAdd: PropTypes.bool,
  disableSearch: PropTypes.bool
}

export default React.memo(TopBody)
