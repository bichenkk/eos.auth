import {
  PERMISSIONFORM_FETCHITEM_LOAD,
  PERMISSIONFORM_FETCHITEM_SUCCEED,
  PERMISSIONFORM_FETCHITEM_FAIL,
  PERMISSIONFORM_EDITFORM_CHANGE,
  PERMISSIONFORM_ENTER_RESET,
  PERMISSIONFORM_CREATEITEM_LOAD,
  PERMISSIONFORM_CREATEITEM_SUCCEED,
  PERMISSIONFORM_CREATEITEM_FAIL,
  PERMISSIONFORM_EDITITEM_LOAD,
  PERMISSIONFORM_EDITITEM_SUCCEED,
  PERMISSIONFORM_EDITITEM_FAIL,
  PERMISSIONFORM_DELETEITEM_LOAD,
  PERMISSIONFORM_DELETEITEM_SUCCEED,
  PERMISSIONFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case PERMISSIONFORM_FETCHITEM_LOAD:
      return {
        ...state,
        isFetchItemLoading: true,
        fetchItemErrors: null,
      }
    case PERMISSIONFORM_FETCHITEM_SUCCEED:
      return {
        ...state,
        isFetchItemLoading: false,
        item: action.item,
      }
    case PERMISSIONFORM_FETCHITEM_FAIL:
      return {
        ...state,
        isFetchItemLoading: false,
        fetchItemErrors: action.fetchItemErrors ? [].concat(action.fetchItemErrors) : null,
      }
    case PERMISSIONFORM_ENTER_RESET:
      return {}
    case PERMISSIONFORM_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
      }
    case PERMISSIONFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemErrors: null,
      }
    case PERMISSIONFORM_CREATEITEM_SUCCEED:
      return {
        ...state,
        isCreateItemLoading: false,
        isCreateItemSuccess: true,
      }
    case PERMISSIONFORM_CREATEITEM_FAIL:
      return {
        ...state,
        isCreateItemLoading: false,
        createItemErrors: action.createItemErrors ? [].concat(action.createItemErrors) : null,
      }
    case PERMISSIONFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemErrors: null,
      }
    case PERMISSIONFORM_EDITITEM_SUCCEED:
      return {
        ...state,
        isEditItemLoading: false,
        isEditItemSuccess: true,
      }
    case PERMISSIONFORM_EDITITEM_FAIL:
      return {
        ...state,
        isEditItemLoading: false,
        editItemErrors: action.editItemErrors ? [].concat(action.editItemErrors) : null,
      }
    case PERMISSIONFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemErrors: null,
      }
    case PERMISSIONFORM_DELETEITEM_SUCCEED:
      return {
        ...state,
        isDeleteItemLoading: false,
        isDeleteItemSuccess: true,
      }
    case PERMISSIONFORM_DELETEITEM_FAIL:
      return {
        ...state,
        isDeleteItemLoading: false,
        deleteItemErrors: action.deleteItemErrors ? [].concat(action.deleteItemErrors) : null,
      }
    default:
      return state
  }
}
