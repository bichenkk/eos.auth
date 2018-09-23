import {
  APPLICATIONFORM_FETCHITEM_LOAD,
  APPLICATIONFORM_FETCHITEM_SUCCEED,
  APPLICATIONFORM_FETCHITEM_FAIL,
  APPLICATIONFORM_EDITFORM_CHANGE,
  APPLICATIONFORM_ENTER_RESET,
  APPLICATIONFORM_CREATEITEM_LOAD,
  APPLICATIONFORM_CREATEITEM_SUCCEED,
  APPLICATIONFORM_CREATEITEM_FAIL,
  APPLICATIONFORM_EDITITEM_LOAD,
  APPLICATIONFORM_EDITITEM_SUCCEED,
  APPLICATIONFORM_EDITITEM_FAIL,
  APPLICATIONFORM_DELETEITEM_LOAD,
  APPLICATIONFORM_DELETEITEM_SUCCEED,
  APPLICATIONFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case APPLICATIONFORM_FETCHITEM_LOAD:
      return {
        ...state,
        isFetchItemLoading: true,
        fetchItemErrors: null,
      }
    case APPLICATIONFORM_FETCHITEM_SUCCEED:
      return {
        ...state,
        isFetchItemLoading: false,
        item: action.item,
      }
    case APPLICATIONFORM_FETCHITEM_FAIL:
      return {
        ...state,
        isFetchItemLoading: false,
        fetchItemErrors: action.fetchItemErrors ? [].concat(action.fetchItemErrors) : null,
      }
    case APPLICATIONFORM_ENTER_RESET:
      return {}
    case APPLICATIONFORM_EDITFORM_CHANGE:
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.field },
      }
    case APPLICATIONFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemErrors: null,
      }
    case APPLICATIONFORM_CREATEITEM_SUCCEED:
      return {
        ...state,
        isCreateItemLoading: false,
        isCreateItemSuccess: true,
      }
    case APPLICATIONFORM_CREATEITEM_FAIL:
      return {
        ...state,
        isCreateItemLoading: false,
        createItemErrors: action.createItemErrors ? [].concat(action.createItemErrors) : null,
      }
    case APPLICATIONFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemErrors: null,
      }
    case APPLICATIONFORM_EDITITEM_SUCCEED:
      return {
        ...state,
        isEditItemLoading: false,
        isEditItemSuccess: true,
      }
    case APPLICATIONFORM_EDITITEM_FAIL:
      return {
        ...state,
        isEditItemLoading: false,
        editItemErrors: action.editItemErrors ? [].concat(action.editItemErrors) : null,
      }
    case APPLICATIONFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemErrors: null,
      }
    case APPLICATIONFORM_DELETEITEM_SUCCEED:
      return {
        ...state,
        isDeleteItemLoading: false,
        isDeleteItemSuccess: true,
      }
    case APPLICATIONFORM_DELETEITEM_FAIL:
      return {
        ...state,
        isDeleteItemLoading: false,
        deleteItemErrors: action.deleteItemErrors ? [].concat(action.deleteItemErrors) : null,
      }
    default:
      return state
  }
}
