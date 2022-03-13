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
import { eqModel } from './validation'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'
import { resizeImage, uploadImage, makeid } from 'utils/Helpers'
import moment from 'moment'
import { DatePicker } from 'rsuite'
import CurrencyInput from 'react-currency-input-field'

const FormEquiment = ({ equiment = {}, type, setReload, ...others }) => {
  const [data, setData] = useState({
    ...equiment,
    imported_date: equiment?.imported_date || moment()
  })
  const [loading, setLoading] = useState(false)
  const { onPostExecute, onPutExecute, onGetExecute } = useRequestManager()
  const { showSuccess, showError } = useAlert()
  const [category, setCategory] = useState([])

  useEffect(() => {
    async function execute() {
      const result = await onGetExecute(EndPoint.GET_LIST_CATE, {
        params: { per_page: 1000 }
      })
      if (result) {
        setCategory(
          withArray('data', result).map(e => ({
            ...e,
            label: e.name,
            value: e.id
          }))
        )
      } else {
        showError('Không lấy được dữ liệu danh mục')
      }
    }
    execute()

    return () => {
      setData({})
    }
  }, [])

  const _handleChange = useCallback(
    (field, value) => {
      console.log(field, value)
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

  const equimentRequest = useCallback(
    data => {
      console.log(data, 'equiment update')
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
    },
    [type, setReload]
  )

  const onSubmit = useCallback(
    async data => {
      // setLoading(true)
      try {
        let linkimg = ''
        if (data.file)
          linkimg = await uploadImage(
            `images/equiment/${Date.now()}.jpg`,
            data.file
          )
        delete data['file']
        equimentRequest({
          ...data,
          image: linkimg || data.image,
          code: makeid(6)
        })
      } catch (e) {
        console.log(e)
      }
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
          model={eqModel}
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
            value={withEmpty('name', data)}
            label={'Tên thiết bị'}
            onChange={value => _handleChange('name', value)}
            placeholder={'Tên thiết bị'}
            name={'name'}
            leftIcon={<Icon name={'feather-inbox'} />}
            require
          />
          <InputGroup
            value={withEmpty('producer', data)}
            label={'Nguồn gốc'}
            onChange={value => _handleChange('producer', value)}
            placeholder={'Công ty ABC'}
            name={'producer'}
            leftIcon={<Icon name={'feather-sunrise'} />}
            require
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
            data={category}
            value={withEmpty('category_id', data)}
            label={'Danh mục'}
            onChange={value => _handleChange('category_id', value)}
            placeholder={'Danh mục'}
            name={'category_id'}
            leftIcon={<Icon name={'feather-align-justify'} />}
            type='select'
            require
            block
            size='sm'
          />
          <InputGroup
            value={withEmpty('imported_date', data)}
            label={'Ngày nhập'}
            onChange={value => _handleChange('imported_date', value)}
            placeholder={'Ngày nhập'}
            name={'imported_date'}
            leftIcon={<Icon name={'feather-calendar'} />}
            size='sm'
            cleanable={false}
            placement='autoVerticalStart'
            block
            accepter={DatePicker}
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
  }, [data, category])

  return loading ? _renderLoading() : _renderForm()
}

FormEquiment.propTypes = {
  liquidation: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormEquiment)
