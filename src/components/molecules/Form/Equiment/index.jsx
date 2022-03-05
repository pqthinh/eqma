import { withEmpty, withObject } from 'exp-value'
import { useImage } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  Drag,
  DragText,
  Form,
  Icon,
  Image,
  LayoutWrapper, Wrapper,
  WrapperLoading
} from './styled'
import { eqModel } from './validation'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const FormEquiment = ({ equiment, type,setReload, ...others }) => {
  const [data, setData] = useState(equiment)
  const { resizeImage } = useImage()
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
  const _handleChangeImage = useCallback(
    async file => {
      const image = await resizeImage(withEmpty('blobFile', file))
      setData(prev => ({
        ...prev,
        image: image
      }))
    },
    [data]
  )

  const equimentRequest = useCallback(data => {
    console.log(data, 'equiment update')
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_equ, {
              ...data,
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_equ(data.id), {...data, updated_at: new Date()})
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
      equimentRequest(data)
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
            {data.image || data.file ? (
              <Image
                source={
                  (data.file &&
                    URL.createObjectURL(withObject('file', data))) ||
                  data.image
                }
              />
            ) : (
              <DragText>Tải ảnh lên ...</DragText>
            )}
          </Drag>

          <br></br><br></br>

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
            placeholder={'Nguồn gốc'}
            name={'producer'}
            disabled
            leftIcon={<Icon name={'feather-sunrise'} />}
            require
          />
          <InputGroup
            value={withEmpty('category_id', data)}
            label={'Mã danh mục'}
            onChange={value => _handleChange('category_id', value)}
            placeholder={'Mã danh mục'}
            name={'category_id'}
            leftIcon={<Icon name={'feather-align-justify'} />}
            require
          />
          <InputGroup
            value={withEmpty('imported_date', data)}
            label={'Ngày nhập'}
            onChange={value => _handleChange('imported_date', value)}
            placeholder={'Ngày nhập'}
            name={'imported_date'}
            leftIcon={<Icon name={'feather-calendar'} />}
            require
          />
          <InputGroup
            value={withEmpty('notes', data)}
            label={'Ghi chú'}
            onChange={value => _handleChange('notes', value)}
            placeholder={'Ghi chú'}
            name={'notes'}
            leftIcon={<Icon name={'feather-bookmark'} />}
            require
            as="textarea"
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

FormEquiment.propTypes = {
  liquidation: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormEquiment)
