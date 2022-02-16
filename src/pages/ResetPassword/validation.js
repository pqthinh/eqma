import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const userModel = Schema.Model({
  password: StringType()
    .isRequired('Bạn chưa nhập mật khẩu')
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}$/,
      'Mật khẩu này chưa mạnh'
    ),
  'confirmed-password': StringType()
    .isRequired('Bạn chưa nhập mật khẩu mới')
    .addRule((value, data) => {
      if (value !== data.password) {
        return false
      }
      return true
    }, 'Mật khẩu nhập không khớp')
})
