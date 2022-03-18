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
import { departmentModel } from './validation'
import { useAlert, useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const FormDepartment = ({ department, type,setReload, ...others }) => {
  const [data, setData] = useState(department)
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

  const departmentRequest = useCallback(data => {
    async function execute(data) {
      const result =
        type == 'create'
          ? await onPostExecute(EndPoint.create_dep, {
              ...data,
              created_at: new Date()
            })
          : await onPutExecute(EndPoint.updel_dep(data.id), {...data, updated_at: new Date()})
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
      console.log(data)
      departmentRequest(data)
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
          model={departmentModel}
          onSubmit={() => onSubmit(data)}
          formValue={data}
          onCheck={(e)=> console.log(e)}
        >
          <InputGroup
            value={withEmpty('name', data)}
            label={'Tên bộ phận'}
            onChange={value => _handleChange('name', value)}
            placeholder={'Tên bộ phận'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            require
          />
          <InputGroup
            value={withEmpty('quantity', data)}
            label={'SL'}
            onChange={value => _handleChange('quantity', value)}
            placeholder={'SL'}
            name={'quantity'}
            leftIcon={<Icon name={'feather-user'} />}
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

FormDepartment.propTypes = {
  department: PropTypes.object,
  type: PropTypes.string,
  setReload: PropTypes.func
}

export default React.memo(FormDepartment)
