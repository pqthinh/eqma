import { Button, Checkbox, Icon, Input } from 'antd'
import React from 'react'
import { FormItem, FormWrapper, Wrapper } from './styled'

const Login = () => {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Wrapper>
      <FormWrapper
        layout='vertical'
        initialValues={{
          isEmployee: false,
          email: '',
          password: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Username'
          />
        </FormItem>
        <FormItem
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder='Password'
          />
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <a href=''>register now!</a>
        </FormItem>
      </FormWrapper>
    </Wrapper>
  )
}

export default Login
