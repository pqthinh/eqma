import styled from 'styled-components'
import { Form, Input, Checkbox, Button } from 'antd'

export const Wrapper = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
  box-sizing: border-box;
`

export const FormWrapper = styled(Form)`
  max-width: 480px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${props=>props.theme.colors.border};
  align-items: center;
`

export const FormItem = styled(Form.Item)`
  width: 100%;
  margin-bottom: 15px;
`

export const RememberWrapper = styled(Form.Item)`
  width: 100%;
  margin-bottom: 15px;
`

export const Username = styled(Input)``
export const Password = styled(Input.Password)``

export const CheckboxItem = styled(Checkbox)``

export const LoginButton = styled(Button)``

export const styles = {
  layout: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  },
  tailLayout: {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  },
  rememberLayout: {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  }
}
