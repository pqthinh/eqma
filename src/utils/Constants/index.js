const Constant = {
  privateRouter: [
    { URL: '/', name: 'Dashboard' },
    { URL: '/profile', name: 'Profile' },
    { URL: '/profile/update', name: 'Update profile' },
    { URL: '/change-password', name: 'Change password' },
    { URL: '/products', name: 'Product management' },
    { URL: '/users', name: 'User management' }
  ],
  publicRouter: [
    { URL: '/', name: '' },
    { URL: '/login', name: 'Login' },
    { URL: '/register', name: 'register' },
    { URL: '/reset-password/:token', name: 'reset-password' },
    { URL: '/forgot-password', name: 'forgot-password' }
  ],
  contentPage: [
    {},
    { title: 'Tổng quan', link: '/' },
    { title: 'Quản lý người dùng', link: '/users' },
    { title: 'Quản lý sản phẩm', link: '/products' },
    { title: 'Quản lý banner', link: '/banners' },
    { title: 'Quản lý comment', link: '/comments' },
    { title: 'Quản lý danh mục', link: '/categorys' },
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
      icon: 'feather-calendar',
      label: 'Thiết bị',
      child: [
        { key: '7', label: 'Nhập thiết bị' },
        { key: '8', label: 'Quản lý thiết bị' }
      ]
    },
    { key: '9', icon: 'feather-shopping-bag', label: 'Mượn-trả' },
    { key: '10', icon: 'feather-airplay', label: 'Tra cứu' }
  ],
  dataBanner: [
    { label: 'Banner home', value: 'Banner-home' },
    { label: 'banner-category', value: 'banner-category' },
    { label: 'banner-top-product', value: 'banner-top-product' },
    { label: 'Test thooi', value: 'test' }
  ]
}

export default Constant
