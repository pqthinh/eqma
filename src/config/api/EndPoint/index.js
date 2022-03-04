const EndPoint = {
  LOGIN_ADMIN: '/admin/login',
  EMP_ADMIN: '/employee-api/login',
  LOGOUT_ADMIN: '/admin/logout',
  LOGOUT_EMP: '/employee-api/logout',
  ADMIN_DETAIL: '/admin/user-info',
  EMP_DETAIL: '/employee-api/user-info',

  // Muc khai bao
  GET_LIST_EMP: '/employees',
  get_emp: (id)=> `/employees/${id}`,
  GET_LIST_CATE: '/categories',
  get_cat: (id)=> `/categories/${id}`,
  GET_LIST_DEPART: '/departments',
  get_dep: (id)=> `/departments/${id}`,
  GET_LIST_EQU: '/equipments',
  get_equ: (id)=> `/equipments/${id}`,

  GET_LIST_LIQ: '/liquidations',
  get_liq: (id)=> `/liquidations/${id}`,
  GET_LIST_REP: '/repairs',
  get_rep: (id)=> `/repairs/${id}`,
  GET_LIST_REQ: 'requests',
  get_req: (id)=> `requests/${id}`,

  GET_LIST_EREQ: '/employee-requests',
  get_qreq: (id)=> `/employee-requests/${id}`,

  // Profile
  update_admin: '/admin/update-profile',
  update_emp: '/employee-api/update-profile',

  // Thêm sửa xóa department
  create_dep: '/departments',
  updel_dep: id=> `/departments/${id}`,

  // Thêm sửa xóa employee
  create_emp: '/employees',
  updel_emp: id=> `/employees/${id}`,

  // Thêm sửa xóa equipments
  create_equ: '/equipments',
  updel_equ: id=> `/equipments/${id}`,

  // Thêm sửa xóa categories
  create_cat: '/categories',
  updel_cat: id=> `/categories/${id}`,

  // Thêm sửa xóa liquidations
  create_liq: '/liquidations',
  updel_liq: id=> `/liquidations/${id}`,

  // Thêm sửa xóa repairs
  create_rep: '/repairs',
  updel_rep: id=> `/repairs/${id}`,

  // Thêm sửa xóa requests
  create_req: '/requests',
  updel_req: id=> `/requests/${id}`,

  // Thêm sửa xóa employee-requests
  create_ereq: '/employee-requests',
  updel_ereq: id=> `/employee-requests/${id}`,
}

export default EndPoint
