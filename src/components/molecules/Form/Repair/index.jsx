import { withArray, withEmpty } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState,useEffect } from 'react'
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
import { SelectPicker } from 'rsuite'
import Constant from '../../../../utils/Constants'

const FormRepair = ({ repair, type, setReload, ...others }) => {
  const [data, setData] = useState(repair)
  const [loading, setLoading] = useState(false)
  const { onPostExecute, onPutExecute,onGetExecute } = useRequestManager()
  const { showSuccess,showError } = useAlert()
  const [equiment, setEquiment] = useState([])
  const [employee, setEmployee] = useState([])

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )

  const repairRequest = useCallback(
    data => {
      console.log(data, 'repair update')
      async function execute(data) {
        const result =
          type == 'create'
            ? await onPostExecute(EndPoint.create_rep, {
                ...data,
                notes: '',
                created_at: new Date()
              })
            : await onPutExecute(EndPoint.updel_rep(data.id), {
                ...data,
                notes: '',
                updated_at: new Date()
              })
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
      repairRequest(data)
    },
    [data]
  )
  

  useEffect(() => {
    async function execute() {
      Promise.all([
        onGetExecute(EndPoint.GET_LIST_EMP, {
          params: { per_page: 1000 }
        }),
        onGetExecute(EndPoint.GET_LIST_EQU, {
          params: { per_page: 1000 }
        })
      ])
        .then(data => {
          let eq = withArray('data', data[1]).map(e => ({
              ...e,
              label: `${e.name} (${e.id})`,
              value: e.id
            })),
            em = withArray('data', data[0]).map(e => ({
              ...e,
              label: `${e.name} (${e.id})`,
              value: e.id
            }))

          setEquiment(eq)
          setEmployee(em)
        })
        .catch(error => {
          console.log(error)
          showError('Lỗi khi lấy dữ liệu thiết bì')
        })
    }
    execute()

    return () => {
      setData({})
    }
  }, [])

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
          onCheck={e => console.log(e)}
        >
          <InputGroup
            data={equiment}
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
            disabled={type == 'update'}
          />
          <InputGroup
            data={employee}
            value={withEmpty('employee_id', data)}
            label={'Nhân viên quản lý'}
            onChange={value => _handleChange('employee_id', value)}
            placeholder={'Nhân viên quản lý'}
            name={'employee_id'}
            leftIcon={<Icon name={'feather-user'} />}
            accepter={SelectPicker }
            placement='autoVerticalStart'
            require
            block
            size='sm'
          />
          <InputGroup
            value={withEmpty('price', data)}
            label={'Phí'}
            onChange={value => _handleChange('price', value)}
            placeholder={'Phí'}
            name={'price'}
            leftIcon={<Icon name={'feather-dollar-sign'} />}
            require
          />
          <InputGroup
            value={withEmpty('start_date', data) || new Date()}
            type='date'
            label={'Ngày sửa'}
            onChange={value => _handleChange('start_date', value)}
            placeholder={'Ngày sửa'}
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
            value={withEmpty('place', data)}
            label={'Địa chỉ'}
            onChange={value => _handleChange('place', value)}
            placeholder={'Địa chỉ'}
            name={'place'}
            leftIcon={<Icon name={'feather-map-pin'} />}
            require
          />
          <InputGroup
            data={Constant.repstatus}
            value={withEmpty('status', data)}
            label={'Trạng thái'}
            onChange={value => _handleChange('status', value)}
            placeholder={'Trạng thái'}
            name={'status'}
            leftIcon={<Icon name={'feather-pie-chart'} />}
            accepter={SelectPicker }
            placement='autoVerticalStart'
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
  }, [data, employee, equiment])

  return loading ? _renderLoading() : _renderForm()
}

FormRepair.propTypes = {
  repair: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormRepair)
