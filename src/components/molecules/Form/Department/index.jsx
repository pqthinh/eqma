import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  Form,
  Icon,
  LayoutWrapper,
  Wrapper,
  WrapperLoading
} from './styled'
import { departmentModel } from './validation'

const FormDepartment = ({ department, type, ...others }) => {
  const [data, setData] = useState(department)

  const [loading, setLoading] = useState(false)

  const _handleChangedepartment = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const departmentRequest = useCallback(data => {
    console.log(data, type, 'department update')
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      departmentRequest(data)
    },
    [data]
  )

  const _renderLoading = useCallback(() => {
    return <WrapperLoading />
  }, [loading])

  const _renderForm = useCallback(() => {
    return (
      <LayoutWrapper>
        <Form
          fluid
          {...others}
          model={departmentModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên sp'}
            onChange={value => _handleChangedepartment('name', value)}
            placeholder={'Tên sp'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('description', data)}
            label={'Mô tả'}
            onChange={value => _handleChangedepartment('description', value)}
            placeholder={'Mô tả'}
            name={'description'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('categoryId', data)}
            label={'Mã danh mục'}
            onChange={value => _handleChangedepartment('categoryId', value)}
            placeholder={'Mã danh mục'}
            name={'categoryId'}
            leftIcon={<Icon name={'feather-phone'} />}
            require
          />

          <InputGroup
            value={withEmpty('price', data)}
            label={'Giá cả'}
            onChange={value => _handleChangedepartment('price', value)}
            placeholder={'Giá cả'}
            name={'price'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('like_num', data)}
            label={'Số lượt thích'}
            onChange={value => _handleChangedepartment('like_num', value)}
            placeholder={'Số lượt thích'}
            name={'like_num'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />
          <InputGroup
            value={withEmpty('view', data)}
            label={'Lượt xem'}
            onChange={value => _handleChangedepartment('view', value)}
            placeholder={'Lượt xem'}
            name={'view'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('tag', data)}
            label={'Thẻ tìm kiếm'}
            onChange={value => _handleChangedepartment('tag', value)}
            placeholder={'Thẻ tìm kiếm'}
            name={'tag'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('uid', data)}
            label={'Mã người đăng tin'}
            onChange={value => _handleChangedepartment('uid', value)}
            placeholder={'Mã người đăng tin'}
            name={'uid'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <Wrapper>
            <Button type={'submit'}>
              {type == 'update' ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  return loading ? _renderLoading() : _renderForm()
}

FormDepartment.propTypes = {
  department: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormDepartment)
