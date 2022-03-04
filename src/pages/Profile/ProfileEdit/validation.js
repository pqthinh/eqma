import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const profileModel = Schema.Model({
  name: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  address: StringType().maxLength(50),
  phone: StringType().maxLength(11),
  email: StringType().isRequired('Chưa nhập trường này').maxLength(50),
  gender: StringType()
})
