import { combineReducers } from 'redux'
import app from './app'
import home from './home'
import login from './login'
import register from './register'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import admin from './admin'
import applicationList from './applicationList'
import applicationForm from './applicationForm'
import permissionList from './permissionList'
import permissionForm from './permissionForm'
import userList from './userList'
import userForm from './userForm'
import deviceList from './deviceList'
import deviceForm from './deviceForm'
import accessLogList from './accessLogList'
import accessLogForm from './accessLogForm'
import shopDashboard from './shopDashboard'

export default combineReducers({
  app,
  home,
  login,
  register,
  forgotPassword,
  resetPassword,
  admin,
  applicationList,
  applicationForm,
  permissionList,
  permissionForm,
  userList,
  userForm,
  deviceList,
  deviceForm,
  accessLogList,
  accessLogForm,
  shopDashboard,
})
