import bowser from 'bowser'
import { version } from '../../package.json'
import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'

export const reset = () => ({
  type: ActionTypes.FORGOTPASSWORD_ENTER_RESET,
})

export const changeFormFields = formFieldsChange => ({
  type: ActionTypes.FORGOTPASSWORD_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const sendForgotPasswordRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.FORGOTPASSWORD_FORGOTPASSWORD_LOAD })
  try {
    const browserInfo = bowser.getParser(window.navigator.userAgent).getBrowser()
    const deviceVersion = `${browserInfo.name} ${browserInfo.version}`
    await api.post(dispatch, 'utility/forgot_password', {
      ...values,
      app: 'admin',
      app_version: version,
      device: 'web',
      device_version: deviceVersion,
    })
    dispatch({ type: ActionTypes.FORGOTPASSWORD_FORGOTPASSWORD_SUCCEED })
  } catch (errors) {
    dispatch({
      type: ActionTypes.FORGOTPASSWORD_FORGOTPASSWORD_FAIL,
      forgotPasswordErrors: errors,
    })
  }
}
