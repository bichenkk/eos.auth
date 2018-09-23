import {
  ADMIN_OPENSUBMENU_CHANGE,
  ADMIN_TOGGLESIDER_CHANGE,
  ADMIN_CHANGEBREAKPOINT_CHANGE,
  ADMIN_FETCHME_LOAD,
  ADMIN_FETCHME_SUCCEED,
  ADMIN_FETCHME_FAIL,
  ADMIN_FETCHSHOP_LOAD,
  ADMIN_FETCHSHOP_SUCCEED,
  ADMIN_FETCHSHOP_FAIL,
} from '../constants/actionTypes'
import { MENU_OPEN_KEYS } from '../constants/app'

export default (state = {}, action) => {
  switch (action.type) {
    case ADMIN_OPENSUBMENU_CHANGE:
      return {
        ...state,
        openKeys: action.openKeys,
      }
    case ADMIN_TOGGLESIDER_CHANGE: {
      const stateOpenKeys = state.openKeys || []
      const nonCollapsedOpenKeys = stateOpenKeys.length === 0
        ? MENU_OPEN_KEYS
        : stateOpenKeys
      return {
        ...state,
        collapsed: !state.collapsed,
        openKeys: !state.collapsed ? [] : nonCollapsedOpenKeys,
      }
    }
    case ADMIN_CHANGEBREAKPOINT_CHANGE: {
      // only change collapse when on break point change
      const collapsed = (!!action.onBreakpoint !== !!state.onBreakpoint)
        ? !!action.onBreakpoint
        : state.collapsed
      const stateOpenKeys = state.openKeys || []
      const nonCollapsedOpenKeys = stateOpenKeys.length === 0
        ? MENU_OPEN_KEYS
        : stateOpenKeys
      return {
        ...state,
        onBreakpoint: !!action.onBreakpoint,
        collapsed,
        openKeys: collapsed ? [] : nonCollapsedOpenKeys,
      }
    }
    case ADMIN_FETCHME_LOAD:
      return {
        ...state,
        isFetchMeLoading: true,
        fetchMeErrors: null,
      }
    case ADMIN_FETCHME_SUCCEED:
      return {
        ...state,
        isFetchMeLoading: false,
        me: action.me,
      }
    case ADMIN_FETCHME_FAIL:
      return {
        ...state,
        isFetchMeLoading: false,
        fetchMeErrors: action.fetchMeErrors ? [].concat(action.fetchMeErrors) : null,
      }
    case ADMIN_FETCHSHOP_LOAD:
      return {
        ...state,
        isFetchShopLoading: true,
        fetchShopErrors: null,
      }
    case ADMIN_FETCHSHOP_SUCCEED:
      return {
        ...state,
        isFetchShopLoading: false,
        shop: action.shop,
      }
    case ADMIN_FETCHSHOP_FAIL:
      return {
        ...state,
        isFetchShopLoading: false,
        fetchShopErrors: action.fetchShopErrors ? [].concat(action.fetchShopErrors) : null,
      }
    default:
      return state
  }
}
