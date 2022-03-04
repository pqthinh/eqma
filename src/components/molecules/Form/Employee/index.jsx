import { withBoolean, withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  Form,
  Icon,
  LayoutWrapper,
  Wrapper,
  WrapperLoading,
  FlexWrapper
} from './styled'
import { employeeModel } from './validation'

const FormEmployee = ({ employee, type, ...others }) => {
  const [data, setData] = useState(employee)

  const [loading, setLoading] = useState(false)

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const employeeRequest = useCallback(data => {
    console.log(data, 'employee update')
    
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      employeeRequest(data)
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
          model={employeeModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <br></br>

          <InputGroup
            value={withEmpty('name', data)}
            label={'Họ tên'}
            onChange={value => _handleChange('name', value)}
            placeholder={'Họ tên'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('email', data)}
            label={'Email'}
            onChange={value => _handleChange('email', value)}
            placeholder={'Email'}
            name={'email'}
            disabled
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          
          <FlexWrapper>
            <InputGroup
              value={withEmpty('department_id', data)}
              label={'Phòng ban'}
              onChange={value => _handleChange('department_id', value)}
              placeholder={'Phòng ban'}
              name={'department_id'}
              leftIcon={<Icon name={'feather-type'} />}
              require
            />
            <InputGroup
              value={withEmpty('is_manager', data)}
              label={'QL'}
              placeholder={'QL'}
              name={'is_manager'}
              leftIcon={<Icon name={'feather-type'} />}
              onChange={value => _handleChange('is_manager', value)}
            />
          </FlexWrapper>

          <InputGroup
            value={withEmpty('phone_number', data)}
            label={'Số điện thoại'}
            placeholder={'Sđt'}
            name={'phone_number'}
            leftIcon={<Icon name={'feather-phone'} />}
            disabled={withBoolean('phone_number', data)}
            onChange={value => _handleChange('phone_number', value)}
          />
          <InputGroup
            value={withEmpty('address', data)}
            label={'Điạ chỉ'}
            placeholder={'Địa chỉ'}
            name={'address'}
            leftIcon={<Icon name={'feather-map-pin'} />}
            onChange={value => _handleChange('address', value)}
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

FormEmployee.propTypes = {
  employee: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormEmployee)
