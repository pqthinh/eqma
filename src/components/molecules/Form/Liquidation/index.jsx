import { withArray, withEmpty, withObject } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  Drag,
  DragText,
  Form,
  Icon,
  Image,
  LayoutWrapper,
  Wrapper,
  WrapperLoading
} from './styled'
import { lqModel } from './validation'
import { resizeImage, uploadImage, makeid } from 'utils/Helpers'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'
import CurrencyInput from 'react-currency-input-field'

const FormLiquidation = ({ liquidation, type, setReload, ...others }) => {
  const [data, setData] = useState(liquidation)
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useAlert()
  const { onPostExecute, onPutExecute, onGetExecute } = useRequestManager()
  const [equiment, setEquiment] = useState([])
  const [employee, setEmployee] = useState([])

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
          console.log(data)

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

  const _handleChange = useCallback(
    (field, value) => {
      setData(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [data]
  )
  const _handleChangeImage = useCallback(
    async file => {
      const image = await resizeImage(withEmpty('blobFile', file))
      setData(prev => ({
        ...prev,
        file: image
      }))
    },
    [data]
  )

  const employeeRequest = useCallback(data => {
    console.log(data, 'employee update')
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_equ, {
              ...data,
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_equ(data.id), {
              ...data,
              updated_at: new Date()
            })
      if (result) {
        showSuccess('Lưu thông tin thành công')
        setReload(true)
        setLoading(false)
      }
    }
    execute(data)
  }, [])

  const onSubmit = useCallback(
    async data => {
      // setLoading(true)
      let linkimg = ''
      if (data.file)
        linkimg = await uploadImage(
          `images/equiment/${Date.now()}.jpg`,
          data.file
        )
      delete data["file"]
      employeeRequest({
        ...data,
        image: linkimg || data.image,
        code: makeid(6)
      })
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
          model={lqModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <Drag
            draggable
            onChange={e => _handleChangeImage(e[e.length - 1])}
            autoUpload={false}
          >
            {data?.image || data?.file ? (
              <Image
                source={
                  data.file
                    ? URL.createObjectURL(withObject('file', data))
                    : data.image
                }
              />
            ) : (
              <DragText>Tải ảnh lên ...</DragText>
            )}
          </Drag>

          <br></br>
          <br></br>

          <InputGroup
            data={equiment}
            value={withEmpty('equipment_id', data)}
            label={'Thiết bị'}
            onChange={value => _handleChange('equipment_id', value)}
            placeholder={'Thiết bị'}
            name={'equipment_id'}
            leftIcon={<Icon name={'feather-file-text'} />}
            type='select'
            require
            block
            size='sm'
          />

          <InputGroup
            data={employee}
            value={withEmpty('employee_id', data)}
            label={'Nhân viên quản lý'}
            onChange={value => _handleChange('employee_id', value)}
            placeholder={'Nhân viên quản lý'}
            name={'employee_id'}
            leftIcon={<Icon name={'feather-user'} />}
            type='select'
            require
            block
            size='sm'
          />

          <InputGroup
            intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
            placeholder={'Giá niêm yết'}
            onValueChange={value => _handleChange('price', value)}
            label={'Giá niêm yết'}
            name={'price'}
            leftIcon={<Icon name={'feather-sunrise'} />}
            require
            accepter={CurrencyInput}
            style={{ border: 0 }}
          />

          <InputGroup
            value={withEmpty('details', data)}
            label={'Chi tiết'}
            onChange={e => _handleChange('details', e)}
            placeholder={'Chi tiết'}
            name={'details'}
            leftIcon={<Icon name={'feather-bookmark'} />}
            require
            componentClass='textarea'
            rows={3}
          />
          <InputGroup
            value={withEmpty('place', data)}
            label={'Địa chỉ'}
            onChange={e => _handleChange('place', e)}
            placeholder={'Địa chỉ'}
            name={'place'}
            leftIcon={<Icon name={'feather-map-pin'} />}
            require
          />
          <InputGroup
            value={withEmpty('notes', data)}
            label={'Ghi chú'}
            onChange={e => _handleChange('notes', e)}
            placeholder={'Ghi chú'}
            name={'notes'}
            leftIcon={<Icon name={'feather-bookmark'} />}
            require
            componentClass='textarea'
            rows={3}
          />

          <Wrapper>
            <Button type={'submit'}>
              {type == 'update' ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data, equiment, employee])

  return loading ? _renderLoading() : _renderForm()
}

FormLiquidation.propTypes = {
  liquidation: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormLiquidation)
