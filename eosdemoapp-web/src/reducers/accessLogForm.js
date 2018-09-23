import {
  ACCESS_LOGFORM_FETCHITEM_LOAD,
  ACCESS_LOGFORM_FETCHITEM_SUCCEED,
  ACCESS_LOGFORM_FETCHITEM_FAIL,
  ACCESS_LOGFORM_EDITFORM_CHANGE,
  ACCESS_LOGFORM_ENTER_RESET,
  ACCESS_LOGFORM_CREATEITEM_LOAD,
  ACCESS_LOGFORM_CREATEITEM_SUCCEED,
  ACCESS_LOGFORM_CREATEITEM_FAIL,
  ACCESS_LOGFORM_EDITITEM_LOAD,
  ACCESS_LOGFORM_EDITITEM_SUCCEED,
  ACCESS_LOGFORM_EDITITEM_FAIL,
  ACCESS_LOGFORM_DELETEITEM_LOAD,
  ACCESS_LOGFORM_DELETEITEM_SUCCEED,
  ACCESS_LOGFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ACCESS_LOGFORM_FETCHITEM_LOAD:
      return {
        ...state,
        isFetchItemLoading: true,
        fetchItemErrors: null,
      }
    case ACCESS_LOGFORM_FETCHITEM_SUCCEED:
      return {
        ...state,
        isFetchItemLoading: false,
        item: action.item,
      }
    case ACCESS_LOGFORM_FETCHITEM_FAIL:
      return {
        ...state,
        isFetchItemLoading: false,
        fetchItemErrors: action.fetchItemErrors ? [].concat(action.fetchItemErrors) : null,
      }
    case ACCESS_LOGFORM_ENTER_RESET:
      return {}
    case ACCESS_LOGFORM_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
      }
    case ACCESS_LOGFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemErrors: null,
      }
    case ACCESS_LOGFORM_CREATEITEM_SUCCEED:
      return {
        ...state,
        isCreateItemLoading: false,
        isCreateItemSuccess: true,
      }
    case ACCESS_LOGFORM_CREATEITEM_FAIL:
      return {
        ...state,
        isCreateItemLoading: false,
        createItemErrors: action.createItemErrors ? [].concat(action.createItemErrors) : null,
      }
    case ACCESS_LOGFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemErrors: null,
      }
    case ACCESS_LOGFORM_EDITITEM_SUCCEED:
      return {
        ...state,
        isEditItemLoading: false,
        isEditItemSuccess: true,
      }
    case ACCESS_LOGFORM_EDITITEM_FAIL:
      return {
        ...state,
        isEditItemLoading: false,
        editItemErrors: action.editItemErrors ? [].concat(action.editItemErrors) : null,
      }
    case ACCESS_LOGFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemErrors: null,
      }
    case ACCESS_LOGFORM_DELETEITEM_SUCCEED:
      return {
        ...state,
        isDeleteItemLoading: false,
        isDeleteItemSuccess: true,
      }
    case ACCESS_LOGFORM_DELETEITEM_FAIL:
      return {
        ...state,
        isDeleteItemLoading: false,
        deleteItemErrors: action.deleteItemErrors ? [].concat(action.deleteItemErrors) : null,
      }
    default:
      return state
  }
}
