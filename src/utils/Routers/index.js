const Routers = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password/:token',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/not-found',
  NAV_LINK: [
    '/',
    '/system/user',
    '/system/log',
    '/report/employee',
    '/report/category',
    '/report/department',
    '/equipment/import',
    '/equipment/list',
    '/history',
    '/search'
  ],
  SYSTEM: 'sys/form',
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
  UPDATE_PROFILE: '/profile/update'
}

export default Routers
