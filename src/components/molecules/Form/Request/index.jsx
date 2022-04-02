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
import { requestModel } from './validation'

const FormRequest = ({ request, type, ...others }) => {
  const [data, setData] = useState(request)
  const { resizeImage } = useImage()

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
          <InputGroup
            value={withEmpty('categoryId', data)}
            label={'Mã danh mục'}
            onChange={value => _handleChange('categoryId', value)}
            placeholder={'Mã danh mục'}
            name={'categoryId'}
            leftIcon={<Icon name={'feather-phone'} />}
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
