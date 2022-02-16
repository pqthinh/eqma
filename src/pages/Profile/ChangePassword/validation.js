import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const changePasswordModel = Schema.Model({
  password: StringType().isRequired('Nhập trường này'),
  newPassword: StringType()
    .isRequired('Nhập trường này')
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}$/,
      'Mật khẩu này chưa mạnh'
    ),
  confirmPassword: StringType()
    .isRequired('Nhập trường này')
    .addRule((value, data) => {
      if (value !== data.newPassword) {
        return false
      }
      return true
    }, 'Mật khẩu nhập không khớp')
})
