import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import { PERMISSIONS } from '../constants/app'

const searchKeys = [
  'id',
]

export const fetchItems = (params = {}, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.PERMISSIONLIST_FETCHITEMS_LOAD })
  try {
    const {
      current = 1,
      pageSize,
      sort = 'created_at',
      order = 'descend',
      search,
    } = params
    const $offset = (current - 1) * pageSize
    const $limit = pageSize
    const $sort = { [sort]: order === 'descend' ? -1 : 1 }
    const $or = (search && searchKeys.map(key => ({ [key]: { $like: `%${search}%` } }))) || null
    const query = {
      $offset,
      $limit,
      $sort,
    }
    $or && (query.$or = $or)
    // const result = await api.get(dispatch, `permission`, query, accessToken)
    const result = await new Promise((resolve, reject) => {
      return setTimeout(() => {
        return resolve({
          total: 10,
          data: PERMISSIONS,
        })
      }, 1000)
    })
    const {
      data: items,
      total,
    } = result
    dispatch({
      type: ActionTypes.PERMISSIONLIST_FETCHITEMS_SUCCEED,
      items,
      total,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.PERMISSIONLIST_FETCHITEMS_FAIL,
      fetchItemsErrors: errors,
    })
  }
}

export const changeTable = params => (dispatch) => {
  const { pagination = {}, filters = {}, sorter = {} } = params
  dispatch({
    type: ActionTypes.PERMISSIONLIST_CHANGETABLE_CHANGE,
    pagination,
    filters,
    sorter,
  })
}

export const searchTable = ({ isSearching }) => (dispatch) => {
  dispatch({
    type: ActionTypes.PERMISSIONLIST_SEARCHTABLE_SEARCH,
    isSearching,
  })
}

export const editSearch = params => (dispatch) => {
  const { search } = params
  dispatch({
    type: ActionTypes.PERMISSIONLIST_SEARCHTABLE_EDIT,
    search,
  })
}
