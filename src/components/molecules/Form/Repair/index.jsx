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
import { repairModel } from './validation'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const FormRepair = ({ repair, type, setReload, ...others }) => {
  const [data, setData] = useState(repair)
  const [loading, setLoading] = useState(false)
  const { onPostExecute, onPutExecute } = useRequestManager()
  const { showSuccess } = useAlert()

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const repairRequest = useCallback(data => {
    console.log(data, 'repair update')
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_rep, {
              ...data,
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_rep(data.id), {...data, updated_at: new Date()})
      if (result) {
        showSuccess('Lưu thông tin thành công')
        setReload(true)
        setLoading(false)
      }
    }
    execute(data)
  }, [type, setReload])

  const onSubmit = useCallback(
    data => {
      // setLoading(true)
      repairRequest(data)
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
          model={repairModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <InputGroup
            value={withEmpty('employee_id', data)}
            label={'Mã NV'}
            onChange={value => _handleChange('employee_id', value)}
            placeholder={'Mã NV'}
            name={'employee_id'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('price', data)}
            label={'Phí'}
            onChange={value => _handleChange('price', value)}
            placeholder={'Phí'}
            name={'price'}
            disabled
            leftIcon={<Icon name={'feather-dollar-sign'} />}
            require
          />
          <InputGroup
            value={withEmpty('details', data)}
            label={'Chi tiết'}
            onChange={e => _handleChange('details', e)}
            placeholder={'Chi tiết'}
            name={'details'}
            leftIcon={<Icon name={'feather-framer'} />}
            require
            componentClass='textarea'
            rows={3}
          />
          <InputGroup
            value={withEmpty('notes', data)}
            label={'Ghi chú'}
            onChange={e => _handleChange('notes', e)}
            placeholder={'Ghi chú'}
            name={'notes'}
            leftIcon={<Icon name={'feather-framer'} />}
            require
            componentClass='textarea'
            rows={3}
          />
          <InputGroup
            value={withEmpty('place', data)}
            label={'Địa chỉ'}
            onChange={value => _handleChange('place', value)}
            placeholder={'Địa chỉ'}
            name={'place'}
            leftIcon={<Icon name={'feather-map-pin'} />}
            require
          />
          <InputGroup
            value={withEmpty('status', data)}
            label={'Trạng thái'}
            onChange={value => _handleChange('status', value)}
            placeholder={'Trạng thái'}
            name={'status'}
            leftIcon={<Icon name={'feather-pie-chart'} />}
            require
          />
          <InputGroup
            value={withEmpty('start_date', data) || new Date()}
            type="date"
            label={'Ngày sửa'}
            onChange={value => _handleChange('start_date', value)}
            placeholder={'Ngày sửa'}
            name={'start_date'}
            leftIcon={<Icon name={'feather-calendar'} />}
            require
          />
          <InputGroup
            value={withEmpty('end_date', data) || new Date()}
            type="date"
            label={'Ngày hẹn trả'}
            onChange={value => _handleChange('end_date', value)}
            placeholder={'Ngày hẹn trả'}
            name={'end_date'}
            leftIcon={<Icon name={'feather-calendar'} />}
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

FormRepair.propTypes = {
  repair: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormRepair)
