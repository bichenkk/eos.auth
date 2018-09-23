import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'

export const reset = () => ({
  type: ActionTypes.RESETPASSWORD_ENTER_RESET,
})

export const changeFormFields = formFieldsChange => ({
  type: ActionTypes.RESETPASSWORD_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const sendResetPasswordRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.RESETPASSWORD_RESETPASSWORD_LOAD })
  try {
    await api.post(dispatch, 'utility/reset_password', values)
    dispatch({ type: ActionTypes.RESETPASSWORD_RESETPASSWORD_SUCCEED })
  } catch (errors) {
    dispatch({
      type: ActionTypes.RESETPASSWORD_RESETPASSWORD_FAIL,
      resetPasswordErrors: errors,
    })
  }
}
