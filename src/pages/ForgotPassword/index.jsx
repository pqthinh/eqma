import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import {
  BackButton,
  Button,
  ButtonToolbar,
  FooterWrapper,
  Form,
  Header,
  Icon,
  Input,
  LayoutWrapper
} from './styled'
import { userModel } from './validation'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()
  const onGotoLoginPage = useCallback(() => history.push(Routers.LOGIN), [])

  const onChangeEmail = useCallback(v => setEmail(v), [email])
  const onSubmit = useCallback(() => {
    console.log(email)
  }, [email])

  return (
    <LayoutWrapper>
      <Header subTitle='Lấy lại mật khẩu' />
      <Form fluid model={userModel} onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={onChangeEmail}
          placeholder={'Email'}
          name={'email'}
          leftIcon={<Icon name={'feather-mail'} />}
        />
        <ButtonToolbar>
          <Button type={'submit'}>XÁC NHẬN</Button>
        </ButtonToolbar>
      </Form>
      <FooterWrapper>
        <BackButton
          label={'Về trang đăng nhập'}
          icon={'feather-arrow-left'}
          onClick={onGotoLoginPage}
          color='#000'
        />
      </FooterWrapper>
    </LayoutWrapper>
  )
}

export default React.memo(ForgotPasswordPage)
