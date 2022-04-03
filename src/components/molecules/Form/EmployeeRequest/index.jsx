import { EndPoint } from 'config/api'
import { withEmpty, withArray } from 'exp-value'
import { useAlert, useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { SelectPicker } from 'rsuite'
import { Constants } from 'utils'
import InputGroup from '../../InputGroup'
import { Button, Form, Icon, LayoutWrapper, Wrapper } from './styled'
import { employeeRequestModel } from './validation'

const FormEmployeeRequest = ({ erequest, type, ...others }) => {
  if(!erequest) erequest={...erequest, type: 1}
  const [data, setData] = useState(erequest)
  const { onPostExecute, onPutExecute, onGetExecute } = useRequestManager()
  const { showSuccess, showError } = useAlert()
  const [equi, setEqui] = useState()

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const datatype = []
  for (const [key, value] of Object.entries(Constants.request_type)) {
    datatype.push({ value: key, label: value })
  }

  const employeeRequest = useCallback(data => {
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_ereq, {
              ...data,
              notes: '',
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_ereq(data.id), {
              ...data,
              notes: '',
              updated_at: new Date()
            })
      if (result) {
        showSuccess('Lưu thông tin thành công')
      } else {
        showError('Lỗi không lấy được thông tin request')
      }
    }
    execute(data)
  }, [])

  const onSubmit = useCallback(
    data => {
      employeeRequest(data)
    },
    [data]
  )

  useEffect(() => {
    async function execute() {
      const result = await onGetExecute(EndPoint.GET_LIST_EQU, {
        params: { per_page: 1000 }
      })
      if (result) {
        setEqui(
          withArray('data', result).map(e => ({
            ...e,
            label: `${e.id} ${e.name}`,
            value: e.id
          }))
        )
        _handleChange('type', 1)
      } else {
        showError('Không lấy được dữ liệu thiết bị')
      }
    }
    execute()
    return () => {
      setData({})
    }
  }, [])

  return (
    <LayoutWrapper>
      <Form
        fluid
        {...others}
        model={employeeRequestModel}
        onSubmit={() => onSubmit(data)}
        formValue={data}
      >
        <InputGroup
          data={datatype}
          value={withEmpty('type', data)||1}
          label={'Hình thức'}
          onChange={value => _handleChange('type', value)}
          placeholder={'Hình thức'}
          name={'type'}
          leftIcon={<Icon name={'feather-align-justify'} />}
          placement='autoVerticalStart'
          accepter={SelectPicker}
          require
          block
          size='sm'
        />
        <InputGroup
          data={equi}
          value={withEmpty('equipment_id', data)}
          label={'Mã thiết bị'}
          onChange={value => _handleChange('equipment_id', value)}
          placeholder={'Mã thiết bị'}
          name={'equipment_id'}
          leftIcon={<Icon name={'feather-align-justify'} />}
          placement='autoVerticalStart'
          accepter={SelectPicker}
          require
          block
          size='sm'
        />
        {data?.type == 1 ? (
          <>
            <InputGroup
              value={withEmpty('start_date', data) || new Date()}
              type='date'
              label={'Ngày mượn'}
              onChange={value => _handleChange('start_date', value)}
              placeholder={'Ngày mượn'}
              name={'start_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
            <InputGroup
              value={withEmpty('end_date', data) || new Date()}
              type='date'
              label={'Ngày hẹn trả'}
              onChange={value => _handleChange('end_date', value)}
              placeholder={'Ngày hẹn trả'}
              name={'end_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
          </>
        ) : data?.type == 2 ? (
          <>
            <InputGroup
              value={withEmpty('end_date', data) || new Date()}
              type='date'
              label={'Ngày trả'}
              onChange={value => _handleChange('end_date', value)}
              placeholder={'Ngày trả'}
              name={'end_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
          </>
        ) : data?.type == 3 ? (
          <>
            <InputGroup
              value={withEmpty('start_date', data) || new Date()}
              type='date'
              label={'Ngày sửa chữa'}
              onChange={value => _handleChange('start_date', value)}
              placeholder={'Ngày sửa chữa'}
              name={'start_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
            <InputGroup
              value={withEmpty('end_date', data) || new Date()}
              type='date'
              label={'Ngày hẹn'}
              onChange={value => _handleChange('end_date', value)}
              placeholder={'Ngày hẹn'}
              name={'end_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
          </>
        ) : data?.type == 4 ? (
          <>
            <InputGroup
              value={withEmpty('start_date', data) || new Date()}
              type='date'
              label={'Ngày thanh lý'}
              onChange={value => _handleChange('start_date', value)}
              placeholder={'Ngày thanh lý'}
              name={'start_date'}
              leftIcon={<Icon name={'feather-calendar'} />}
              require
            />
          </>
        ) : (
          <InputGroup
            value={withEmpty('start_date', data) || new Date()}
            type='date'
            label={'Ngày phát hiện'}
            onChange={value => _handleChange('start_date', value)}
            placeholder={'Ngày phát hiện'}
            name={'start_date'}
            leftIcon={<Icon name={'feather-calendar'} />}
            require
          />
        )}

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
        {/* <InputGroup
          value={withEmpty('notes', data)}
          label={'Ghi chú'}
          onChange={e => _handleChange('notes', e)}
          placeholder={'Ghi chú'}
          name={'notes'}
          leftIcon={<Icon name={'feather-bookmark'} />}
          require
          componentClass='textarea'
          rows={3}
        /> */}

        <Wrapper>
          <Button type={'submit'}>
            {type == 'update' ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Wrapper>
      </Form>
    </LayoutWrapper>
  )
}

FormEmployeeRequest.propTypes = {
  erequest: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormEmployeeRequest)
