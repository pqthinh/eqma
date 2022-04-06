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
import { requestModel } from './validation'
import { SelectPicker } from 'rsuite'
import { Constants } from 'utils'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const FormRequest = ({ request, type, ...others }) => {
  const [data, setData] = useState(request)
  const [loading, setLoading] = useState(false)
  const { onPostExecute, onPutExecute } = useRequestManager()
  const { showSuccess, showError } = useAlert()

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
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_req, {
              ...data,
              notes: '',
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_req(data.id), {
              ...data,
              notes: '',
              updated_at: new Date()
            })
      if (result) {
        showSuccess('Lưu thông tin thành công')
      } else {
        showError('Lỗi không gửi được request')
      }
    }
    execute(data)
  }, [])

  const onSubmit = useCallback(
    data => {
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
          onCheck={e => console.log(e)}
        >
          <InputGroup
            data={Constants.dropdown_rtype}
            value={withEmpty('type', data) || 1}
            label={'Hình thức'}
            onChange={value => _handleChange('type', value)}
            placeholder={'Hình thức'}
            name={'type'}
            leftIcon={<Icon name={'feather-pie-chart'} />}
            placement='autoVerticalStart'
            accepter={SelectPicker}
            require
            block
            size='sm'
            disabled={type == 'update'}
          />
          <InputGroup
            data={Constants.dropdown_status}
            value={withEmpty('status', data) || 1}
            label={'Trạng thái'}
            onChange={value => _handleChange('status', value)}
            placeholder={'Trạng thái'}
            name={'status'}
            leftIcon={<Icon name={'feather-align-justify'} />}
            placement='autoVerticalStart'
            accepter={SelectPicker}
            require
            block
            size='sm'
          />
          <InputGroup
            value={withEmpty('equipment_id', data)}
            label={'Mã sp'}
            onChange={value => _handleChange('equipment_id', value)}
            placeholder={'Mã sp'}
            name={'equipment_id'}
            leftIcon={<Icon name={'feather-zap'} />}
            require
          />
          <InputGroup
            value={withEmpty('employee_id', data)}
            label={'Mã nhân viên'}
            onChange={value => _handleChange('employee_id', value)}
            placeholder={'Mã nhân viên'}
            name={'employee_id'}
            disabled
            leftIcon={<Icon name={'feather-user'} />}
            require
          />

          <InputGroup
            value={withEmpty('details', data)}
            label={'Mô tả'}
            onChange={e => _handleChange('details', e)}
            placeholder={'Mô tả'}
            name={'details'}
            leftIcon={<Icon name={'feather-bookmark'} />}
            require
            componentClass='textarea'
            rows={3}
          />

          <InputGroup
            value={withEmpty('created_at', data)}
            label={'Ngày yêu cầu'}
            onChange={value => _handleChange('created_at', value)}
            placeholder={'Ngày yêu cầu'}
            name={'created_at'}
            leftIcon={<Icon name={'feather-calendar'} />}
            require
            type='date'
          />
          <InputGroup
            value={withEmpty('updated_at', data)}
            label={'Ngày đáp ứng'}
            onChange={value => _handleChange('updated_at', value)}
            placeholder={'Ngày đáp ứng'}
            name={'updated_at'}
            leftIcon={<Icon name={'feather-calendar'} />}
            require
            type='date'
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

FormRequest.propTypes = {
  employee: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormRequest)
