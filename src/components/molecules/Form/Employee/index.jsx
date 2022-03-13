import { EndPoint } from 'config/api'
import { withArray, withEmpty } from 'exp-value'
import { useAlert, useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  FlexWrapper,
  Form,
  Icon,
  LayoutWrapper,
  Wrapper,
  WrapperLoading
} from './styled'
import { employeeModel } from './validation'
import { makeid } from 'utils/Helpers'

const FormEmployee = ({ employee, type, setReload, ...others }) => {
  const [data, setData] = useState(employee)
  const [loading, setLoading] = useState(false)
  const { onPostExecute, onPutExecute , onGetExecute} = useRequestManager()
  const { showSuccess, showError } = useAlert()
  const [showPass, setShowPass] = useState(false)
  const [dep, setDep] = useState([])

  useEffect(() => {
    async function execute() {
      const result = await onGetExecute(EndPoint.GET_LIST_DEP, {
        params: { per_page: 1000 }
      })
      if (result) {
        setDep(
          withArray('data', result).map(e => ({
            ...e,
            label: e.name,
            value: e.id
          }))
        )
      } else {
        showError('Không lấy được dữ liệu phòng ban')
      }
    }
    execute()

    return () => {
      setData({})
    }
  }, [])

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const employeeRequest = useCallback(
    data => {
      async function execute(data) {
        const result =
          type == 'create'
            ? await onPostExecute(EndPoint.create_emp, {
                ...data,
                code: makeid(6),
                join_date: new Date()
              })
            : await onPutExecute(EndPoint.updel_emp(data.id), data)
        if (result) {
          showSuccess('Lưu thông tin thành công')
          setReload(true)
          setLoading(false)
        }
      }
      execute(data)
    },
    [type, setReload]
  )

  const onSubmit = useCallback(
    data => {
      // setLoading(true)
      employeeRequest(data)
    },
    [data, setReload]
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
            disabled={type != 'create'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          {type == 'create' ? (
            <InputGroup
              value={withEmpty('password', data)}
              label={'Password'}
              onChange={value => _handleChange('password', value)}
              placeholder={'Password'}
              name={'password'}
              leftIcon={<Icon name={'feather-lock'} />}
              rightIcon={
                <Icon
                  name={showPass ? 'feather-eye-off' : 'feather-eye'}
                  background='true'
                  onClick={() => setShowPass(!showPass)}
                />
              }
              type={showPass ? 'text' : 'password'}
              require
            />
          ) : null}

          <FlexWrapper>
            <InputGroup
              data={dep}
              value={withEmpty('department_id', data)}
              label={'Phòng ban'}
              onChange={value => _handleChange('department_id', value)}
              placeholder={'Phòng ban'}
              name={'department_id'}
              leftIcon={<Icon name={'feather-type'} />}
              type='select'
              require
              block
              size='sm'
            />
            <InputGroup
              value={withEmpty('is_manager', data)}
              label={'QL'}
              placeholder={'QL'}
              name={'is_manager'}
              leftIcon={<Icon name={'feather-type'} />}
              onChange={value => _handleChange('is_manager', value)}
              require
            />
          </FlexWrapper>

          <InputGroup
            value={withEmpty('phone_number', data)}
            label={'Số điện thoại'}
            placeholder={'Sđt'}
            name={'phone_number'}
            leftIcon={<Icon name={'feather-phone'} />}
            onChange={value => _handleChange('phone_number', value)}
            require
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
  }, [data, type, showPass,dep])

  return loading ? _renderLoading() : _renderForm()
}

FormEmployee.propTypes = {
  employee: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormEmployee)
