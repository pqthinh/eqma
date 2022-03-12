import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const eqModel = Schema.Model({
  name: StringType().isRequired("Nhập trường bắt buộc"),
  image: StringType().isRequired("Chọn ảnh cho sp"),
  producer: StringType().isRequired("Nhập trường bắt buộc"),
  price: StringType().isRequired("Nhập trường bắt buộc"),
  category_id: StringType().isRequired("Nhập trường bắt buộc"),
  imported_date: StringType().isRequired("Nhập trường bắt buộc"),
  notes: StringType().isRequired("Nhập trường bắt buộc"),
})
