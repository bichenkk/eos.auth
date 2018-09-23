import bowser from 'bowser'
import { version } from '../../package.json'
import * as ActionTypes from '../constants/actionTypes'
import { login } from './app'
import api from '../utils/api'

export const reset = () => ({
  type: ActionTypes.LOGIN_ENTER_RESET,
})

export const changeFormFields = formFieldsChange => ({
  type: ActionTypes.LOGIN_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const sendLoginRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_LOGIN_LOAD })
  try {
    const browserInfo = bowser.getParser(window.navigator.userAgent).getBrowser()
    const deviceVersion = `${browserInfo.name} ${browserInfo.version}`
    const result = await new Promise((resolve, reject) => {
      return setTimeout(() => {
        return resolve({
          token: '1231312312',
        })
      }, 1000)
    })
    dispatch({ type: ActionTypes.LOGIN_LOGIN_SUCCEED })
    // dispatch(login({ accessToken: result.token, rememberMe: values.remember_me }))
  } catch (errors) {
    dispatch({
      type: ActionTypes.LOGIN_LOGIN_FAIL,
      loginErrors: errors,
    })
  }
}
