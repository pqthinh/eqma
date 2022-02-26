import { Loading } from 'components'
import PropTypes from 'prop-types'
import React, { lazy, Suspense, useMemo, useCallback, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { PrivateTemplate, PublicTemplate } from 'layout'
import { Routers, Constants } from 'utils'

const EmptyPage = lazy(() => import('pages/NotFoundPage'))
//  public page
const LoginPage = lazy(() => import('pages/Login'))
const ForgotPasswordPage = lazy(() => import('pages/ForgotPassword'))
const ResetPasswordPage = lazy(() => import('pages/ResetPassword'))
// private page
const Dashboard = lazy(() => import('pages/Dashboard'))

// 2 Profile
const ProfilePage = lazy(() => import('pages/Profile/ProfilePage'))
const UpdateProfilePage = lazy(() => import('pages/Profile/ProfileEdit'))
const ChangePasswordPage = lazy(() => import('pages/Profile/ChangePassword'))

// Mục khai báo
// 1: Ds nhân viên
const EmployeeReport = lazy(() => import('pages/Report/Employee'))

const Routes = ({ isLoggedIn, ...rest }) => {
  const location = useLocation()
  const history = useHistory()

  const isPrivateRouter = useMemo(() => {
    return (
      Constants.privateRouter.map(e => e.URL).indexOf(location.pathname) > -1
    )
  }, [location.pathname])

  const isPublicRouter = useMemo(() => {
    return (
      Constants.publicRouter.map(e => e.URL).indexOf(location.pathname) > -1
    )
  }, [location.pathname])

  const _handleBadRouter = useCallback(() => {
    if (!isPrivateRouter && !isPublicRouter) {
      return (
        <Route
          {...rest}
          path={location.pathname}
          render={props => {
            return <EmptyPage {...rest} {...props} />
          }}
        />
      )
    }
    if (location.pathname == '/') {
      if (!isLoggedIn) history.push(Routers.LOGIN)
      return
    }
  }, [location.pathname, isLoggedIn])

  useEffect(() => {
    if (isPrivateRouter && !isLoggedIn) history.push('/login')
    if (isPublicRouter && isLoggedIn) history.push('/')
  }, [location.pathname, isLoggedIn])

  const _renderPrivateSuperAdminRoute = useCallback(() => {
    return (
      <PrivateTemplate>
        <Route
          {...rest}
          exact
          path={'/'}
          render={props => {
            return <Dashboard {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={'/profile'}
          render={props => {
            return <ProfilePage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={'/profile/update'}
          render={props => {
            return <UpdateProfilePage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={'/change-password'}
          render={props => {
            return <ChangePasswordPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={'/report/employee'}
          render={props => {
            return <EmployeeReport {...rest} {...props} />
          }}
        />
        
      </PrivateTemplate>
    )
  }, [isLoggedIn, location.pathname])

  const _renderPublicRoute = useCallback(() => {
    return (
      <PublicTemplate>
        <Route
          {...rest}
          exact
          path={['/', Routers.LOGIN]}
          render={props => {
            return <LoginPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.FORGOT_PASSWORD}
          render={props => {
            return <ForgotPasswordPage {...rest} {...props} />
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.RESET_PASSWORD}
          render={props => {
            return <ResetPasswordPage {...rest} {...props} />
          }}
        />
        {_handleBadRouter()}
      </PublicTemplate>
    )
  }, [isLoggedIn, location.pathname])

  const route = useCallback(() => {
    return isLoggedIn !== null
      ? isLoggedIn
        ? _renderPrivateSuperAdminRoute()
        : _renderPublicRoute()
      : _handleBadRouter()
  }, [isLoggedIn, location.pathname])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>{route()}</Switch>
    </Suspense>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Routes
