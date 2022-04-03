import { withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button, Form,
  Icon, LayoutWrapper, Wrapper,
  WrapperLoading
} from './styled'
import { requestModel } from './validation'

const FormRequest = ({ request, type, ...others }) => {
  const [data, setData] = useState(request)

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

  const requestRequest = useCallback(data => {
    console.log(data, 'employee update')
  }, [])

  const onSubmit = useCallback(
    data => {
      console.log(data, "data")
      setLoading(true)
      requestRequest(data)
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
          model={requestModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
          onCheck={(e)=> console.log(e)}
        >

          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên sp'}
            onChange={value => _handleChange('name', value)}
            placeholder={'Tên sp'}
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

          <Wrapper>
            <Button type={'submit'}>{type == 'update' ? 'Cập nhật' : 'Thêm mới'}</Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  return loading ? _renderLoading() : _renderForm()
}

FormRequest.propTypes = {
  employee: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormRequest)
