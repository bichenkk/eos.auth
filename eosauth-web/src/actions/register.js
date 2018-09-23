import bowser from 'bowser'
import { version } from '../../package.json'
import * as ActionTypes from '../constants/actionTypes'
import { login } from './app'
import api from '../utils/api'

export const reset = () => ({
  type: ActionTypes.REGISTER_ENTER_RESET,
})

export const changeFormFields = formFieldsChange => ({
  type: ActionTypes.REGISTER_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const fetchToken = params => async (dispatch) => {
  dispatch({ type: ActionTypes.REGISTER_FETCHTOKEN_LOAD })
  try {
    const result = await api.get(dispatch, 'utility/check_invitation_token', params)
    dispatch({
      type: ActionTypes.REGISTER_FETCHTOKEN_SUCCEED,
      fetchTokenResult: result,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.REGISTER_FETCHTOKEN_FAIL,
      fetchTokenErrors: errors,
    })
  }
}

export const sendLoginRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.REGISTER_LOGIN_LOAD })
  const browserInfo = bowser.getParser(window.navigator.userAgent).getBrowser()
  const deviceVersion = `${browserInfo.name} ${browserInfo.version}`
  try {
    const result = await api.post(dispatch, 'authentication', {
      ...values,
      app: 'admin',
      app_version: version,
      device: 'web',
      device_version: deviceVersion,
    })
    dispatch({ type: ActionTypes.REGISTER_LOGIN_SUCCEED })
    dispatch(login({ accessToken: result.token, rememberMe: values.remember_me }))
  } catch (errors) {
    dispatch({
      type: ActionTypes.REGISTER_LOGIN_FAIL,
      loginErrors: errors,
    })
  }
}

export const sendRegisterRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.REGISTER_REGISTER_LOAD })
  try {
    await api.post(dispatch, 'administrator', {
      ...values,
    })
    dispatch({ type: ActionTypes.REGISTER_REGISTER_SUCCEED })
    dispatch(sendLoginRequest({
      email: values.email,
      password: values.password,
      remember_me: true,
    }))
  } catch (errors) {
    dispatch({
      type: ActionTypes.REGISTER_REGISTER_FAIL,
      registerErrors: errors,
    })
  }
}
