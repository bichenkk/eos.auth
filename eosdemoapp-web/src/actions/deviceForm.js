import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import getFieldFromItem from '../utils/getFieldFromItem'

export const keys = [
  'title',
  'cover_image_url',
  'host',
]

export const editForm = formFieldsChange => ({
  type: ActionTypes.DEVICEFORM_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const reset = () => ({
  type: ActionTypes.DEVICEFORM_ENTER_RESET,
})

export const fetchItem = (params, accessToken) => async (dispatch) => {
  !params.isRefreshing && dispatch({ type: ActionTypes.DEVICEFORM_FETCHITEM_LOAD })
  try {
    const item = await api.get(dispatch, `device/${params.id}`, {}, accessToken)
    dispatch({
      type: ActionTypes.DEVICEFORM_FETCHITEM_SUCCEED,
      item,
    })
    const field = getFieldFromItem(
      item,
      keys,
    )
    // field.enabled.value = !!item.enabled
    dispatch({
      type: ActionTypes.DEVICEFORM_EDITFORM_CHANGE,
      field,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.DEVICEFORM_FETCHITEM_FAIL,
      fetchItemErrors: errors,
    })
  }
}

export const createItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.DEVICEFORM_CREATEITEM_LOAD })
  try {
    await api.post(dispatch, `device`, params, accessToken)
    dispatch({ type: ActionTypes.DEVICELIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.DEVICEFORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.DEVICEFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.DEVICEFORM_CREATEITEM_FAIL,
      createItemErrors: errors,
    })
  }
}

export const editItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.DEVICEFORM_EDITITEM_LOAD })
  try {
    await api.patch(dispatch, `device/${params.id}`, params, accessToken)
    dispatch({ type: ActionTypes.DEVICEFORM_EDITITEM_SUCCEED })
  } catch (errors) {
    dispatch({
      type: ActionTypes.DEVICEFORM_EDITITEM_FAIL,
      editItemErrors: errors,
    })
  }
}

export const deleteItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.DEVICEFORM_DELETEITEM_LOAD })
  try {
    await api.delete(dispatch, `device/${params.id}`, {}, accessToken)
    dispatch({ type: ActionTypes.DEVICEFORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.DEVICEFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.DEVICEFORM_DELETEITEM_FAIL,
      deleteItemErrors: errors,
    })
  }
}
