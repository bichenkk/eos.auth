import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'

export const openChangeMenu = openKeys => ({
  type: ActionTypes.ADMIN_OPENSUBMENU_CHANGE,
  openKeys,
})

export const toggleSider = () => ({
  type: ActionTypes.ADMIN_TOGGLESIDER_CHANGE,
})

export const changeBreakpoint = onBreakpoint => ({
  type: ActionTypes.ADMIN_CHANGEBREAKPOINT_CHANGE,
  onBreakpoint,
})

export const fetchMe = accessToken => async (dispatch) => {
  dispatch({ type: ActionTypes.ADMIN_FETCHME_LOAD })
  try {
    const me = await api.get(dispatch, 'me', {}, accessToken)
    dispatch({
      type: ActionTypes.ADMIN_FETCHME_SUCCEED,
      me,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.ADMIN_FETCHME_FAIL,
      fetchMeErrors: errors,
    })
  }
}

export const fetchShop = (params, accessToken) => async (dispatch) => {
  !params.isRefreshing && dispatch({ type: ActionTypes.ADMIN_FETCHSHOP_LOAD })
  try {
    const item = await api.get(dispatch, `shop/${params.id}`, {}, accessToken)
    dispatch({
      type: ActionTypes.ADMIN_FETCHSHOP_SUCCEED,
      shop: item,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.ADMIN_FETCHSHOP_FAIL,
      fetchShopErrors: errors,
    })
  }
}

export const resetShop = () => dispatch => (
  dispatch({
    type: ActionTypes.ADMIN_FETCHSHOP_SUCCEED,
    shop: null,
  })
)
