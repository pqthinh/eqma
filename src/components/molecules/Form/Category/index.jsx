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
import { categoryModel } from './validation'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const FormCategory = ({ category, type, setReload, ...others }) => {
  const [data, setData] = useState(category)
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
  const categoryRequest = useCallback(data => {
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_cat, {
              ...data,
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_cat(data.id), {...data, updated_at: new Date()})
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
      categoryRequest(data)
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
          model={categoryModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
          onCheck={(e)=> console.log(e)}
        >
          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên danh mục'}
            onChange={value => _handleChange('name', value)}
            placeholder={'Tên danh mục'}
            name={'name'}
            leftIcon={<Icon name={'feather-clipboard'} />}
            require
          />
          <InputGroup
            value={withEmpty('quantity', data)}
            label={'SL'}
            onChange={value => _handleChange('quantity', value)}
            placeholder={'SL'}
            name={'quantity'}
            leftIcon={<Icon name={'feather-hash'} />}
            require
          />
          <InputGroup
            value={withEmpty('notes', data)}
            label={'Ghi chú'}
            onChange={value => _handleChange('notes', value)}
            placeholder={'Ghi chú'}
            name={'notes'}
            leftIcon={<Icon name={'feather-clipboard'} />}
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

FormCategory.propTypes = {
  category: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormCategory)
