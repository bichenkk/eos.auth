import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import getFieldFromItem from '../utils/getFieldFromItem'

export const keys = [
  'id',
  'title',
  'created_at',
  'updated_at',
]

export const editForm = formFieldsChange => ({
  type: ActionTypes.APPLICATIONFORM_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const reset = () => ({
  type: ActionTypes.APPLICATIONFORM_ENTER_RESET,
})

export const fetchItem = (params, accessToken) => async (dispatch) => {
  !params.isRefreshing && dispatch({ type: ActionTypes.APPLICATIONFORM_FETCHITEM_LOAD })
  try {
    const item = await api.get(dispatch, `application/${params.id}`, {}, accessToken)
    dispatch({
      type: ActionTypes.APPLICATIONFORM_FETCHITEM_SUCCEED,
      item,
    })
    const field = getFieldFromItem(
      item,
      keys,
    )
    // field.enabled.value = !!item.enabled
    dispatch({
      type: ActionTypes.APPLICATIONFORM_EDITFORM_CHANGE,
      field,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.APPLICATIONFORM_FETCHITEM_FAIL,
      fetchItemErrors: errors,
    })
  }
}

export const createItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.APPLICATIONFORM_CREATEITEM_LOAD })
  try {
    await api.post(dispatch, `application`, params, accessToken)
    dispatch({ type: ActionTypes.APPLICATIONLIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.APPLICATIONFORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.APPLICATIONFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.APPLICATIONFORM_CREATEITEM_FAIL,
      createItemErrors: errors,
    })
  }
}

export const editItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.APPLICATIONFORM_EDITITEM_LOAD })
  try {
    await api.patch(dispatch, `application/${params.id}`, params, accessToken)
    dispatch({ type: ActionTypes.APPLICATIONFORM_EDITITEM_SUCCEED })
  } catch (errors) {
    dispatch({
      type: ActionTypes.APPLICATIONFORM_EDITITEM_FAIL,
      editItemErrors: errors,
    })
  }
}

export const deleteItem = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.APPLICATIONFORM_DELETEITEM_LOAD })
  try {
    await api.delete(dispatch, `application/${params.id}`, {}, accessToken)
    dispatch({ type: ActionTypes.APPLICATIONFORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.APPLICATIONFORM_ENTER_RESET })
  } catch (errors) {
    dispatch({
      type: ActionTypes.APPLICATIONFORM_DELETEITEM_FAIL,
      deleteItemErrors: errors,
    })
  }
}
