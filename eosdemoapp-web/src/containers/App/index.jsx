import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PublicRoute from '../../components/PublicRoute'
import PrivateRoute from '../../components/PrivateRoute'
import Login from '../Login'
import Register from '../Register'
import ForgotPassword from '../ForgotPassword'
import ResetPassword from '../ResetPassword'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import Home from '../Home'
import ApplicationList from '../ApplicationList'
import ApplicationForm from '../ApplicationForm'
import PermissionList from '../PermissionList'
import PermissionForm from '../PermissionForm'
import UserList from '../UserList'
import UserForm from '../UserForm'
import DeviceList from '../DeviceList'
import DeviceForm from '../DeviceForm'
import AccessLogList from '../AccessLogList'
import AccessLogForm from '../AccessLogForm'
import './index.less'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path='/' component={() => <Redirect to='/home' />} />
          <PublicRoute exact path='/home' component={Home} />
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/register' component={Register} />
          <PublicRoute exact path='/forgot_password' component={ForgotPassword} />
          <PublicRoute exact path='/reset_password' component={ResetPassword} />
          <PrivateRoute exact path='/' component={() => <Redirect to='/dashboard' />} />
          <PrivateRoute exact path='/home' component={() => <Redirect to='/dashboard' />} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/application' component={ApplicationList} />
          <PrivateRoute exact path='/application/create' component={props => <ApplicationForm {...props} type='create' />} />
          <PrivateRoute exact path='/application/edit/:itemId' component={props => <ApplicationForm {...props} type='edit' />} />
          <PrivateRoute exact path='/permission' component={PermissionList} />
          <PrivateRoute exact path='/permission/create' component={props => <PermissionForm {...props} type='create' />} />
          <PrivateRoute exact path='/permission/edit/:itemId' component={props => <PermissionForm {...props} type='edit' />} />
          <PrivateRoute exact path='/user' component={UserList} />
          <PrivateRoute exact path='/user/create' component={props => <UserForm {...props} type='create' />} />
          <PrivateRoute exact path='/user/edit/:itemId' component={props => <UserForm {...props} type='edit' />} />
          <PrivateRoute exact path='/device' component={DeviceList} />
          <PrivateRoute exact path='/device/create' component={props => <DeviceForm {...props} type='create' />} />
          <PrivateRoute exact path='/device/edit/:itemId' component={props => <DeviceForm {...props} type='edit' />} />
          <PrivateRoute exact path='/access_log' component={AccessLogList} />
          <PrivateRoute exact path='/access_log/create' component={props => <AccessLogForm {...props} type='create' />} />
          <PrivateRoute exact path='/access_log/edit/:itemId' component={props => <AccessLogForm {...props} type='edit' />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
