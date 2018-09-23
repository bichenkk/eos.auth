import * as ActionTypes from '../constants/actionTypes'

export const login = values => (dispatch) => {
  // only save the access token to local storage when rememberMe is true
  values.rememberMe && localStorage.setItem('accessToken', values.accessToken)
  dispatch({ type: ActionTypes.APP_LOGIN_SET, accessToken: values.accessToken })
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken')
  dispatch({ type: ActionTypes.APP_LOGOUT_SET })
}
