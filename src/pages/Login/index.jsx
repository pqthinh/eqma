import { EndPoint } from 'config/api'
import { withBoolean, withEmpty } from 'exp-value'
import { useRequestManager, useToken, useUser } from 'hooks'
import { InputGroup } from 'molecules'
import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import { BaseCheckbox } from 'atoms'
import {
  Button,
  ButtonToolbar,
  ForgotButton,
  Form,
  Header,
  Icon,
  LayoutWrapper
} from './styled'
import { userModel } from './validation'

const LoginPage = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    isAdmin: true
  })

  const [showPassword, setShowPassword] = useState(false)

  const history = useHistory()
  const { onPostExecute } = useRequestManager()
  const { saveToken } = useToken()
  const { saveUser } = useUser()

  const onChange = useCallback(
    (name, value) => setData(prev => ({ ...prev, [name]: value })),
    [data]
  )

  const onSubmit = useCallback(() => {
    async function execute(data) {
      const result = await onPostExecute(
        withBoolean('isAdmin', data)
          ? EndPoint.LOGIN_ADMIN
          : EndPoint.EMP_ADMIN,
        data,
        false
      )
      if (result) {
        await saveToken(withEmpty('access_token', result))
        saveUser({...withEmpty('user', result), role: withBoolean('isAdmin', data)? "Admin": "Employee"})
        history.push('/')
      }
    }
    execute(data)
  })

  const onShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  )
  const onGotoForgotPassword = useCallback(
    () => history.push(Routers.FORGOT_PASSWORD),
    []
  )
  useEffect(() => {
    return () => {
      window.location.reload()
    };
  }, [])

  return (
    <LayoutWrapper>
      <Header
        subTitle={
          withBoolean('isAdmin', data) ? 'Đăng nhập Admin' : 'Đăng nhập NV'
        }
      />
      <Form fluid model={userModel} onSubmit={onSubmit}>
        <InputGroup
          value={data.email}
          onChange={e => onChange('email', e)}
          placeholder={'Email'}
          name={'email'}
          leftIcon={<Icon name={'feather-user'} />}
        />
        <InputGroup
          value={data.password}
          onChange={e => onChange('password', e)}
          placeholder={'Mật khẩu'}
          name={'password'}
          type={showPassword ? 'text' : 'password'}
          leftIcon={<Icon name={'feather-lock'} />}
          rightIcon={
            <Icon
              name={showPassword ? 'feather-eye-off' : 'feather-eye'}
              background='true'
              onClick={onShowPassword}
            />
          }
        />

        <BaseCheckbox
          onChange={(_, checked) => {
            console.log(checked)
            onChange('isAdmin', checked)
          }}
          content={'Đăng nhập với quyền admin'}
          id={'role'}
          checked={withBoolean('isAdmin', data)}
        />
        <ButtonToolbar>
          <ForgotButton appearance='link' onClick={onGotoForgotPassword}>
            Quên mật khẩu?
          </ForgotButton>
          <Button type={'submit'}>ĐĂNG NHẬP</Button>
        </ButtonToolbar>
      </Form>
    </LayoutWrapper>
  )
}

export default React.memo(LoginPage)
