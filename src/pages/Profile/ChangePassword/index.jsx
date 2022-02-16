import { EndPoint } from 'config/api'
import { withEmpty } from 'exp-value'
import { useAlert, useRequestManager } from 'hooks'
import { InputGroup } from 'molecules'
import React, { useCallback, useState } from 'react'
import { Button, Form, Icon, Text, Wrapper } from './styled'
import { changePasswordModel } from './validation'

const ProfileEdit = ({ ...others }) => {
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  })
  const { onPostExecute } = useRequestManager()
  const { showSuccess } = useAlert()

  const handleChangeData = useCallback((field, data) => {
    setData(prev => ({ ...prev, [field]: data }))
  }, [])

  const onSubmit = useCallback(data => {
    console.log(data)
    async function execute(data) {
      const result = await onPostExecute(EndPoint.CHANGE_PASSWORD, data)
      if (result) {
        showSuccess('Cập nhật mật khẩu thành công')
      }
    }
    execute(data)
  }, [])

  return (
    <Wrapper {...others}>
      <Form
        fluid
        model={changePasswordModel}
        formValue={data}
        onSubmit={() => {
          onSubmit(data)
        }}
      >
        <InputGroup
          value={withEmpty('password', data)}
          label={'Mật khẩu cũ'}
          placeholder={'Mật khẩu cũ'}
          name={'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          onChange={e => handleChangeData('password', e)}
        />
        <InputGroup
          value={withEmpty('newPassword', data)}
          label={'Mật khẩu mới'}
          placeholder={'Mật khẩu mới'}
          name={'newPassword'}
          onChange={e => handleChangeData('newPassword', e)}
          leftIcon={<Icon name={'feather-lock'} />}
        />
        <InputGroup
          value={withEmpty('confirmPassword', data)}
          label={'Xác nhận mật khẩu'}
          placeholder={'Xác nhận mật khẩu'}
          name={'confirmPassword'}
          onChange={e => handleChangeData('confirmPassword', e)}
          leftIcon={<Icon name={'feather-key'} />}
        />

        <Button type={'submit'}>
          Cập nhật
          <Icon name='feather-refresh-cw' />
        </Button>
      </Form>
    </Wrapper>
  )
}

export default React.memo(ProfileEdit)
