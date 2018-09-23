import {
  FORGOTPASSWORD_ENTER_RESET,
  FORGOTPASSWORD_EDITFORM_CHANGE,
  FORGOTPASSWORD_FORGOTPASSWORD_LOAD,
  FORGOTPASSWORD_FORGOTPASSWORD_SUCCEED,
  FORGOTPASSWORD_FORGOTPASSWORD_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_ENTER_RESET:
      return {}
    case FORGOTPASSWORD_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
        isForgotPasswordLoading: false,
      }
    case FORGOTPASSWORD_FORGOTPASSWORD_LOAD:
      return {
        ...state,
        isForgotPasswordLoading: true,
        forgotPasswordErrors: null,
        isForgotPasswordSuccess: false,
      }
    case FORGOTPASSWORD_FORGOTPASSWORD_SUCCEED:
      return {
        ...state,
        formFieldValues: {},
        isForgotPasswordLoading: false,
        isForgotPasswordSuccess: true,
      }
    case FORGOTPASSWORD_FORGOTPASSWORD_FAIL:
      return {
        ...state,
        isForgotPasswordLoading: false,
        forgotPasswordErrors: action.forgotPasswordErrors ? [].concat(action.forgotPasswordErrors) : null,
      }
    default:
      return state
  }
}
