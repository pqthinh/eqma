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
import { lqModel } from './validation'

const FormLiquidation = ({ liquidation, type, ...others }) => {
  const [data, setData] = useState(liquidation)
  const { resizeImage } = useImage()

  const [loading, setLoading] = useState(false)

  const _handleChangeemployee = useCallback(
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
  }, [])

  const onSubmit = useCallback(
    data => {
      setLoading(true)
      employeeRequest(data)
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
          model={lqModel}
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
            label={'Tên sp'}
            onChange={value => _handleChangeemployee('name', value)}
            placeholder={'Tên sp'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('email', data)}
            label={'Email'}
            onChange={value => _handleChangeemployee('email', value)}
            placeholder={'Email'}
            name={'email'}
            disabled
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('categoryId', data)}
            label={'Mã danh mục'}
            onChange={value => _handleChangeemployee('categoryId', value)}
            placeholder={'Mã danh mục'}
            name={'categoryId'}
            leftIcon={<Icon name={'feather-phone'} />}
            require
          />

          <InputGroup
            value={withEmpty('price', data)}
            label={'Giá cả'}
            onChange={value => _handleChangeemployee('price', value)}
            placeholder={'Giá cả'}
            name={'price'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('like_num', data)}
            label={'Số lượt thích'}
            onChange={value => _handleChangeemployee('like_num', value)}
            placeholder={'Số lượt thích'}
            name={'like_num'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />
          <InputGroup
            value={withEmpty('view', data)}
            label={'Lượt xem'}
            onChange={value => _handleChangeemployee('view', value)}
            placeholder={'Lượt xem'}
            name={'view'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('tag', data)}
            label={'Thẻ tìm kiếm'}
            onChange={value => _handleChangeemployee('tag', value)}
            placeholder={'Thẻ tìm kiếm'}
            name={'tag'}
            leftIcon={<Icon name={'feather-link'} />}
            require
          />

          <InputGroup
            value={withEmpty('uid', data)}
            label={'Mã người đăng tin'}
            onChange={value => _handleChangeemployee('uid', value)}
            placeholder={'Mã người đăng tin'}
            name={'uid'}
            leftIcon={<Icon name={'feather-link'} />}
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

FormLiquidation.propTypes = {
  liquidation: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormLiquidation)
