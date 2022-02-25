import { withEmpty, withObject } from 'exp-value'
import { useImage } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import InputGroup from '../../InputGroup'
import {
  Button,
  Drag,
  DragText,
  Form,
  Icon,
  Image,
  LayoutWrapper,
  Title,
  Wrapper,
  WrapperLoading
} from './styled'
import { productModel } from './validation'

const FormProduct = ({ product, type, ...others }) => {
  const [data, setData] = useState(product)
  const { resizeImage } = useImage()

  const [loading, setLoading] = useState(false)

  const contentForm = useMemo(() => {
    if (type == 'add') {
      return {
        title: 'Thêm mới sản phẩm',
        titleButton: 'Thêm mới'
      }
    }
    if (type == 'update') {
      return {
        title: 'Chỉnh sửa sản phẩm',
        titleButton: 'Cập nhật'
      }
    }
  }, [type])

  const _handleChangeProduct = useCallback(
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

  const productRequest = useCallback(data => {
    console.log(data, 'product update')
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      productRequest(data)
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
          model={productModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
        >
          <Title>{contentForm.title}</Title>
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

          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên sp'}
            onChange={value => _handleChangeProduct('name', value)}
            placeholder={'Tên sp'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('description', data)}
            label={'Mô tả'}
            onChange={value => _handleChangeProduct('description', value)}
            placeholder={'Mô tả'}
            name={'description'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('categoryId', data)}
            label={'Mã danh mục'}
            onChange={value => _handleChangeProduct('categoryId', value)}
            placeholder={'Mã danh mục'}
            name={'categoryId'}
            leftIcon={<Icon name={'feather-phone'} />}
            require
          />

          <InputGroup
            value={withEmpty('price', data)}
            label={'Giá cả'}
            onChange={value => _handleChangeProduct('price', value)}
            placeholder={'Giá cả'}
            name={'price'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('like_num', data)}
            label={'Số lượt thích'}
            onChange={value => _handleChangeProduct('like_num', value)}
            placeholder={'Số lượt thích'}
            name={'like_num'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />
          <InputGroup
            value={withEmpty('view', data)}
            label={'Lượt xem'}
            onChange={value => _handleChangeProduct('view', value)}
            placeholder={'Lượt xem'}
            name={'view'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('tag', data)}
            label={'Thẻ tìm kiếm'}
            onChange={value => _handleChangeProduct('tag', value)}
            placeholder={'Thẻ tìm kiếm'}
            name={'tag'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('uid', data)}
            label={'Mã người đăng tin'}
            onChange={value => _handleChangeProduct('uid', value)}
            placeholder={'Mã người đăng tin'}
            name={'uid'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <Wrapper>
            <Button type={'submit'}>{contentForm.titleButton}</Button>
          </Wrapper>
        </Form>
      </LayoutWrapper>
    )
  }, [data])

  return loading ? _renderLoading() : _renderForm()
}

FormProduct.propTypes = {
  product: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormProduct)
