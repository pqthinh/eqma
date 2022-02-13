const EndPoint = {
  LOGIN: 'admin/login',
  ADMIN_PROFILE: 'admins/profile',
  RESET_PASSWORD: 'auth/resetPassword',
  STAFFS: 'staffs',
  ACCOUNTS: 'accounts',
  IMAGE: 'image',
  CHANGE_PASSWORD: 'change-password',
  GET_LIST_PRODUCT: 'admin/product/filter',
  GET_LIST_USER: 'admin/user',
  GET_LIST_BANNER: 'admin/banner/list',
  GET_LIST_COMMENT: 'admin/comment/list',
  GET_LIST_CATEGORY: 'common/subcategory',
  UPDATE_BANNER: 'admin/update-banner',
  CREATE_BANNER: 'admin/banner-create',
  GET_LIST_NOTIFY: idAdmin => `/admin/get-notify/${idAdmin}`,
  READ_NOTIFY: 'admin/read-notify',
  ADMIN_ACTIVE_POST: 'admin/active-post',
  ADMIN_BAN_POST: 'admin/ban-post',
  ADMIN_ACTIVE_USER: 'admin/active-user',
  ADMIN_BAN_USER: 'admin/user/ban',
  CHANGE_STATUS_BANNER: 'admin/banner-status',
  CHANGE_STATUS_COMMENT: 'admin/comment-status'
}

export default EndPoint
