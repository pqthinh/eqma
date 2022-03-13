import { Schema } from 'rsuite'
const { StringType, NumberType } = Schema.Types

export const departmentModel = Schema.Model({
  name: StringType().isRequired("Nhập trường bắt buộc"),
  quantity: NumberType().isRequired("Nhập trường bắt buộc")
})
