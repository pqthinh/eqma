import { Loading } from 'components'
import PropTypes from 'prop-types'
import React, { lazy, Suspense, useMemo, useCallback, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { PrivateTemplate, PublicTemplate } from 'layout'
import { Routers, Constants } from 'utils'

const EmptyPage = lazy(() => import('pages/EmptyPage'))
//  public page
const LoginPage = lazy(() => import('pages/Login'))

// private page
const Dashboard = lazy(() => import('pages/Dashboard'))

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
      if (isLoggedIn) history.push(Routers.SUPER_ADMIN.MENU[0].URL)
      else history.push(Routers.LOGIN)
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
