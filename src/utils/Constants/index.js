const Constant = {
  privateRouter: [
    { URL: '/', name: 'Dashboard' },
    { URL: '/profile', name: 'Profile' },
    { URL: '/profile/update', name: 'Update profile' },
    { URL: '/change-password', name: 'Change password' },
    { URL: '/system/user', name: '' },
    { URL: '/system/log', name: '' },
    { URL: '/report/employee', name: '' },
    { URL: '/report/category', name: '' },
    { URL: '/report/department', name: '' },
    { URL: '/equipment/import', name: '' },
    { URL: '/equipment/list', name: '' },
    { URL: '/history', name: '' },
    { URL: '/search', name: '' },
    { URL: '/liquidation/form', name: '' },
    { URL: '/report/employee/detail', name: '' },
    { URL: '/equipment/detail', name: '' },
    { URL: '/emp/request', name: '' },
    { URL: '/emp/equipment', name: '' },
    { URL: '/emp/create/request', name: '' }
  ],
  publicRouter: [
    { URL: '/', name: '' },
    { URL: '/login', name: 'login' },
    { URL: '/register', name: 'register' },
    { URL: '/reset-password/:token', name: 'reset-password' },
    { URL: '/forgot-password', name: 'forgot-password' }
  ],
  contentPage: [
    {},
    { title: 'Tổng quan hệ thống', link: '/' },
    // { title: 'Danh sách người dùng', link: '/system/user' },
    // { title: 'Lịch sử mượn trả', link: '/system/log' },
    { title: 'Nhân viên', link: '/report/employee' },
    { title: 'Danh mục', link: '/report/category' },
    { title: 'Phòng ban', link: '/report/department' },
    { title: 'Nhập thiết bị', link: '/equipment/import' },
    { title: 'Quản lý thiết bị', link: '/equipment/list' },
    { title: 'Báo hỏng thiết bị', link: '/equipment/list/broken ' },
    { title: 'Báo mất thiết bị', link: '/equipment/list/lost' },
    { title: 'Báo sửa thiết bị', link: '/equipment/list/fix' },
    { title: 'Lịch sử mượn trả', link: '/history' },
    { title: 'Tra cứu', link: '/search' },
    { title: 'Thông tin cá nhân', link: '/profile' }
  ],
  navigators: (role = 'admin') => {
    if (role.toLowerCase() == 'admin')
      return [
        {
          key: '1',
          icon: 'feather-bar-chart-2',
          label: 'Hệ thống'
          // child: [
          //   { key: '2', label: 'Người mượn' },
          //   { key: '3', label: 'Nhật ký' }
          // ]
        },
        {
          key: '2',
          icon: 'feather-user',
          label: 'Khai báo',
          child: [
            { key: '2', label: 'Nhân viên' },
            { key: '3', label: 'Danh mục' },
            { key: '4', label: 'Phòng ban' }
          ]
        },
        {
          key: '5',
          icon: 'feather-briefcase',
          label: 'Thiết bị',
          child: [
            { key: '5', label: 'Nhập thiết bị' },
            { key: '6', label: 'Quản lý thiết bị' }
          ]
        },
        {
          key: '7',
          icon: 'feather-alert-circle',
          label: 'Mượn-trả'
        },
        { key: '8', icon: 'feather-search', label: 'Tra cứu' }
      ]
    return [
      {
        key: '1',
        icon: 'feather-bar-chart-2',
        label: 'Hệ thống'
      },
      {
        key: '2',
        icon: 'feather-user',
        label: 'Tạo yêu cầu',
      },
      {
        key: '3',
        icon: 'feather-briefcase',
        label: 'Lịch sử'
      },
      { key: '4', icon: 'feather-search', label: 'Tra cứu' }
    ]
  },
  dataBanner: [
    { label: 'Banner home', value: 'Banner-home' },
    { label: 'banner-category', value: 'banner-category' },
    { label: 'banner-top-product', value: 'banner-top-product' },
    { label: 'Test thooi', value: 'test' }
  ],
  equipment_status: {
    1: 'Đang sử dụng', //IN_WORK
    2: 'Đang sửa chữa', //IN_REPAIR
    3: 'Thanh lý', //LIQUIDATION
    4: 'Sẵn sàng', //FREE
    5: 'Không xác định'
  },
  repair_status: {
    1: 'Chưa hoàn thành', //NOT_YET
    2: 'Hoàn thành' //DONE
  },
  request_status: {
    1: 'Đang chờ', //WAITING
    2: 'Đã duyệt', // APPROVE
    3: 'Từ chối' //REJECT
  },
  request_type: {
    1: 'Mượn', // mượn BORROW
    2: 'Trả', // trả  RETURN
    3: 'Sửa chữa', //REPAIR
    4: 'Thanh lý', //LIQUIDATION
    5: 'Báo mất'//LOST
  }
}

export default Constant
