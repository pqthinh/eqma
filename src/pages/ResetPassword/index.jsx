import { useResetPassword } from 'hooks'
import { InputGroup } from 'molecules'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Button,
  ButtonToolbar,
  Form,
  Header,
  Icon,
  LayoutWrapper
} from './styled'
import { userModel } from './validation'

const ResetPasswordPage = () => {
  const { saveToken } = useResetPassword()
  const { search } = useLocation()
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmPassword] = useState('')
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  })

  const onChangePassword = useCallback(v => setPassword(v), [password])
  const onChangeConfirmPassword = useCallback(
    v => setConfirmPassword(v),
    [confirmedPassword]
  )

  const onSaveToken = useCallback(() => {
    const token = new URLSearchParams(search).get('token')

    saveToken(token)
  }, [search])

  const onSubmit = useCallback(() => {
    console.log(password, confirmedPassword)
  }, [password, confirmedPassword])

  const onShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  useEffect(onSaveToken, [search])

  return (
    <LayoutWrapper>
      <Header subTitle='Mật khẩu mới' />
      <Form fluid model={userModel} onSubmit={onSubmit}>
        <InputGroup
          value={password}
          onChange={onChangePassword}
          placeholder={'Nhập mật khẩu mới'}
          name={'password'}
          type={values.showPassword ? 'text' : 'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          rightIcon={
            <Icon
              name={values.showPassword ? 'feather-eye-off' : 'feather-eye'}
              background='true'
              onClick={onShowPassword}
            />
          }
        />
        <InputGroup
          value={confirmedPassword}
          onChange={onChangeConfirmPassword}
          placeholder={'Xác nhận mật khẩu mới'}
          name={'confirmed-password'}
          type={values.showPassword ? 'text' : 'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          rightIcon={
            <Icon
              name={values.showPassword ? 'feather-eye-off' : 'feather-eye'}
              background='true'
              onClick={onShowPassword}
            />
          }
        />
        <ButtonToolbar>
          <Button type={'submit'}>XÁC NHẬN</Button>
        </ButtonToolbar>
      </Form>
    </LayoutWrapper>
  )
}

export default React.memo(ResetPasswordPage)
