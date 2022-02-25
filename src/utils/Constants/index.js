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
    { title: 'Tổng quan', link: '/' },
    { title: 'Danh sách người dùng', link: '/system/user' },
    { title: 'Lịch sử mượn trả', link: '/system/log' },
    { title: 'Nhân viên', link: '/report/employee' },
    { title: 'Danh mục', link: '/report/category' },
    { title: 'Phòng ban', link: '/report/department' },
    { title: 'Nhập thiết bị', link: '/equipment/import' },
    { title: 'Quản lý thiết bị', link: '/equipment/list' },
    { title: 'Báo hỏng thiết bị', link: '/equipment/list/broken ' },
    { title: 'Báo mất thiết bị', link: '/equipment/list/lost' },
    { title: 'Báo sửa thiết bị', link: '/equipment/list/fix' },
    { title: 'Mượn/trả thiết bị', link: '/history' },
    { title: 'Tra cứu', link: '/search' },
    { title: 'Thông tin cá nhân', link: '/profile' }
  ],
  navigators: [
    {
      key: '1',
      icon: 'feather-bar-chart-2',
      label: 'Hệ thống',
      child: [
        { key: '2', label: 'Người mượn' },
        { key: '3', label: 'Nhật ký' }
      ]
    },
    {
      key: '4',
      icon: 'feather-user',
      label: 'Khai báo',
      child: [
        { key: '4', label: 'Nhân viên' },
        { key: '5', label: 'Danh mục' },
        { key: '6', label: 'Phòng ban' }
      ]
    },
    {
      key: '7',
      icon: 'feather-briefcase',
      label: 'Thiết bị',
      child: [
        { key: '7', label: 'Nhập thiết bị' },
        { key: '8', label: 'Quản lý thiết bị' }
      ]
    },
    { key: '9', icon: 'feather-alert-circle', label: 'Mượn-trả' },
    { key: '10', icon: 'feather-search', label: 'Tra cứu' }
  ],
  dataBanner: [
    { label: 'Banner home', value: 'Banner-home' },
    { label: 'banner-category', value: 'banner-category' },
    { label: 'banner-top-product', value: 'banner-top-product' },
    { label: 'Test thooi', value: 'test' }
  ]
}

export default Constant
