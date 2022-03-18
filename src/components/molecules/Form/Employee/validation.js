import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const employeeModel = Schema.Model({
  name: StringType().isRequired("Nhập trường bắt buộc"),
  email: StringType().isRequired("Chọn ảnh cho sp"),
  // department_id: StringType().isRequired("Nhập trường bắt buộc")
})
