import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const profileModel = Schema.Model({
  lastName: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  firstName: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  address: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  phone: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  email: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  gender: StringType().isRequired('Chưa nhập trường này').maxLength(50)
})
