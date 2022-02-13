const Routers = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password/:token',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/not-found',
  NAV_LINK: [
    '/',
    '/users',
    '/products',
    '/banners',
    '/comments',
    '/categorys',
    '/post/news',
    '/post/video',
    '/product',
    '/review'
  ],
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
  UPDATE_PROFILE: '/profile/update'
}

export default Routers
