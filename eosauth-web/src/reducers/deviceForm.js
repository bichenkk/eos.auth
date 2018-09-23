import {
  DEVICEFORM_FETCHITEM_LOAD,
  DEVICEFORM_FETCHITEM_SUCCEED,
  DEVICEFORM_FETCHITEM_FAIL,
  DEVICEFORM_EDITFORM_CHANGE,
  DEVICEFORM_ENTER_RESET,
  DEVICEFORM_CREATEITEM_LOAD,
  DEVICEFORM_CREATEITEM_SUCCEED,
  DEVICEFORM_CREATEITEM_FAIL,
  DEVICEFORM_EDITITEM_LOAD,
  DEVICEFORM_EDITITEM_SUCCEED,
  DEVICEFORM_EDITITEM_FAIL,
  DEVICEFORM_DELETEITEM_LOAD,
  DEVICEFORM_DELETEITEM_SUCCEED,
  DEVICEFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case DEVICEFORM_FETCHITEM_LOAD:
      return {
        ...state,
        isFetchItemLoading: true,
        fetchItemErrors: null,
      }
    case DEVICEFORM_FETCHITEM_SUCCEED:
      return {
        ...state,
        isFetchItemLoading: false,
        item: action.item,
      }
    case DEVICEFORM_FETCHITEM_FAIL:
      return {
        ...state,
        isFetchItemLoading: false,
        fetchItemErrors: action.fetchItemErrors ? [].concat(action.fetchItemErrors) : null,
      }
    case DEVICEFORM_ENTER_RESET:
      return {}
    case DEVICEFORM_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
      }
    case DEVICEFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemErrors: null,
      }
    case DEVICEFORM_CREATEITEM_SUCCEED:
      return {
        ...state,
        isCreateItemLoading: false,
        isCreateItemSuccess: true,
      }
    case DEVICEFORM_CREATEITEM_FAIL:
      return {
        ...state,
        isCreateItemLoading: false,
        createItemErrors: action.createItemErrors ? [].concat(action.createItemErrors) : null,
      }
    case DEVICEFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemErrors: null,
      }
    case DEVICEFORM_EDITITEM_SUCCEED:
      return {
        ...state,
        isEditItemLoading: false,
        isEditItemSuccess: true,
      }
    case DEVICEFORM_EDITITEM_FAIL:
      return {
        ...state,
        isEditItemLoading: false,
        editItemErrors: action.editItemErrors ? [].concat(action.editItemErrors) : null,
      }
    case DEVICEFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemErrors: null,
      }
    case DEVICEFORM_DELETEITEM_SUCCEED:
      return {
        ...state,
        isDeleteItemLoading: false,
        isDeleteItemSuccess: true,
      }
    case DEVICEFORM_DELETEITEM_FAIL:
      return {
        ...state,
        isDeleteItemLoading: false,
        deleteItemErrors: action.deleteItemErrors ? [].concat(action.deleteItemErrors) : null,
      }
    default:
      return state
  }
}
