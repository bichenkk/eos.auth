import {
  USERFORM_FETCHITEM_LOAD,
  USERFORM_FETCHITEM_SUCCEED,
  USERFORM_FETCHITEM_FAIL,
  USERFORM_EDITFORM_CHANGE,
  USERFORM_ENTER_RESET,
  USERFORM_CREATEITEM_LOAD,
  USERFORM_CREATEITEM_SUCCEED,
  USERFORM_CREATEITEM_FAIL,
  USERFORM_EDITITEM_LOAD,
  USERFORM_EDITITEM_SUCCEED,
  USERFORM_EDITITEM_FAIL,
  USERFORM_DELETEITEM_LOAD,
  USERFORM_DELETEITEM_SUCCEED,
  USERFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case USERFORM_FETCHITEM_LOAD:
      return {
        ...state,
        isFetchItemLoading: true,
        fetchItemErrors: null,
      }
    case USERFORM_FETCHITEM_SUCCEED:
      return {
        ...state,
        isFetchItemLoading: false,
        item: action.item,
      }
    case USERFORM_FETCHITEM_FAIL:
      return {
        ...state,
        isFetchItemLoading: false,
        fetchItemErrors: action.fetchItemErrors ? [].concat(action.fetchItemErrors) : null,
      }
    case USERFORM_ENTER_RESET:
      return {}
    case USERFORM_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
      }
    case USERFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemErrors: null,
      }
    case USERFORM_CREATEITEM_SUCCEED:
      return {
        ...state,
        isCreateItemLoading: false,
        isCreateItemSuccess: true,
      }
    case USERFORM_CREATEITEM_FAIL:
      return {
        ...state,
        isCreateItemLoading: false,
        createItemErrors: action.createItemErrors ? [].concat(action.createItemErrors) : null,
      }
    case USERFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemErrors: null,
      }
    case USERFORM_EDITITEM_SUCCEED:
      return {
        ...state,
        isEditItemLoading: false,
        isEditItemSuccess: true,
      }
    case USERFORM_EDITITEM_FAIL:
      return {
        ...state,
        isEditItemLoading: false,
        editItemErrors: action.editItemErrors ? [].concat(action.editItemErrors) : null,
      }
    case USERFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemErrors: null,
      }
    case USERFORM_DELETEITEM_SUCCEED:
      return {
        ...state,
        isDeleteItemLoading: false,
        isDeleteItemSuccess: true,
      }
    case USERFORM_DELETEITEM_FAIL:
      return {
        ...state,
        isDeleteItemLoading: false,
        deleteItemErrors: action.deleteItemErrors ? [].concat(action.deleteItemErrors) : null,
      }
    default:
      return state
  }
}
