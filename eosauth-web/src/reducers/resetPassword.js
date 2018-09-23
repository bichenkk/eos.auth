import {
  RESETPASSWORD_ENTER_RESET,
  RESETPASSWORD_EDITFORM_CHANGE,
  RESETPASSWORD_RESETPASSWORD_LOAD,
  RESETPASSWORD_RESETPASSWORD_SUCCEED,
  RESETPASSWORD_RESETPASSWORD_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case RESETPASSWORD_ENTER_RESET:
      return {}
    case RESETPASSWORD_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
        isResetPasswordLoading: false,
      }
    case RESETPASSWORD_RESETPASSWORD_LOAD:
      return {
        ...state,
        isResetPasswordLoading: true,
        resetPasswordErrors: null,
        isResetPasswordSuccess: false,
      }
    case RESETPASSWORD_RESETPASSWORD_SUCCEED:
      return {
        ...state,
        formFieldValues: {},
        isResetPasswordLoading: false,
        isResetPasswordSuccess: true,
      }
    case RESETPASSWORD_RESETPASSWORD_FAIL:
      return {
        ...state,
        isResetPasswordLoading: false,
        resetPasswordErrors: action.resetPasswordErrors ? [].concat(action.resetPasswordErrors) : null,
      }
    default:
      return state
  }
}
