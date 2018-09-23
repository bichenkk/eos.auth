import {
  REGISTER_ENTER_RESET,
  REGISTER_EDITFORM_CHANGE,
  REGISTER_REGISTER_LOAD,
  REGISTER_REGISTER_SUCCEED,
  REGISTER_REGISTER_FAIL,
  REGISTER_LOGIN_LOAD,
  REGISTER_LOGIN_SUCCEED,
  REGISTER_LOGIN_FAIL,
  REGISTER_FETCHTOKEN_LOAD,
  REGISTER_FETCHTOKEN_SUCCEED,
  REGISTER_FETCHTOKEN_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_ENTER_RESET:
      return {}
    case REGISTER_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
        isLoginLoading: false,
        isRegisterLoading: false,
      }
    case REGISTER_FETCHTOKEN_LOAD:
      return {
        ...state,
        isFetchTokenLoading: true,
        registerErrors: null,
        fetchTokenResult: null,
      }
    case REGISTER_FETCHTOKEN_SUCCEED:
      return {
        ...state,
        isFetchTokenLoading: false,
        fetchTokenResult: action.fetchTokenResult,
      }
    case REGISTER_FETCHTOKEN_FAIL:
      return {
        ...state,
        isFetchTokenLoading: false,
        fetchTokenErrors: action.fetchTokenErrors ? [].concat(action.fetchTokenErrors) : null,
      }
    case REGISTER_REGISTER_LOAD:
      return {
        ...state,
        isRegisterLoading: true,
        registerErrors: null,
        isRegisterSuccess: false,
      }
    case REGISTER_REGISTER_SUCCEED:
      return {
        ...state,
        formFieldValues: {},
        isRegisterLoading: false,
        isRegisterSuccess: true,
        fetchTokenResult: null,
        fetchTokenErrors: null,
      }
    case REGISTER_REGISTER_FAIL:
      return {
        ...state,
        isRegisterLoading: false,
        registerErrors: action.registerErrors ? [].concat(action.registerErrors) : null,
      }
    case REGISTER_LOGIN_LOAD:
      return {
        ...state,
        isLoginLoading: true,
        loginErrors: null,
        isLoginSuccess: false,
      }
    case REGISTER_LOGIN_SUCCEED:
      return {
        ...state,
        formFieldValues: {},
        isLoginLoading: false,
        isLoginSuccess: true,
      }
    case REGISTER_LOGIN_FAIL:
      return {
        ...state,
        isLoginLoading: false,
        loginErrors: action.loginErrors ? [].concat(action.loginErrors) : null,
      }
    default:
      return state
  }
}
