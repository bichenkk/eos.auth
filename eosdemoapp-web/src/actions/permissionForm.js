import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import getFieldFromItem from '../utils/getFieldFromItem'

export const keys = [
  'title',
  'device',
  'data_path',
]

export const editForm = formFieldsChange => ({
  type: ActionTypes.PERMISSIONFORM_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const reset = () => ({
  type: ActionTypes.PERMISSIONFORM_ENTER_RESET,
})

export const fetchItem = (params, accessToken) => async (dispatch) => {
  !params.isRefreshing && dispatch({ type: ActionTypes.PERMISSIONFORM_FETCHITEM_LOAD })
  try {
    const item = await api.get(dispatch, `permission/${params.id}`, {}, accessToken)
    dispatch({
      type: ActionTypes.PERMISSIONFORM_FETCHITEM_SUCCEED,
      item,
    })
    const field = getFieldFromItem(
      item,
      keys,
    )
    // field.enabled.value = !!item.enabled
    dispatch({
      type: ActionTypes.PERMISSIONFORM_EDITFORM_CHANGE,
      field,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.PERMISSIONFORM_FETCHITEM_FAIL,
      fetchItemErrors: errors,
    })
  }
}

export const createItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.PERMISSIONFORM_CREATEITEM_LOAD })
  try {
    await api.post(dispatch, `permission`, params, accessToken)
    dispatch({ type: ActionTypes.PERMISSIONLIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.PERMISSIONFORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.PERMISSIONFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.PERMISSIONFORM_CREATEITEM_FAIL,
      createItemErrors: errors,
    })
  }
}

export const editItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.PERMISSIONFORM_EDITITEM_LOAD })
  try {
    await api.patch(dispatch, `permission/${params.id}`, params, accessToken)
    dispatch({ type: ActionTypes.PERMISSIONFORM_EDITITEM_SUCCEED })
  } catch (errors) {
    dispatch({
      type: ActionTypes.PERMISSIONFORM_EDITITEM_FAIL,
      editItemErrors: errors,
    })
  }
}

export const deleteItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.PERMISSIONFORM_DELETEITEM_LOAD })
  try {
    await api.delete(dispatch, `permission/${params.id}`, {}, accessToken)
    dispatch({ type: ActionTypes.PERMISSIONFORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.PERMISSIONFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.PERMISSIONFORM_DELETEITEM_FAIL,
      deleteItemErrors: errors,
    })
  }
}
