import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import imac from '../../src/assets/imac.png'
import nas from '../../src/assets/nas.jpg'

const searchKeys = [
  'id',
]

export const fetchItems = (params = {}, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.DEVICELIST_FETCHITEMS_LOAD })
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
    const result = await new Promise((resolve, reject) => {
      return setTimeout(() => {
        return resolve({
          total: 10,
          data: [
            {
              title: 'iMac Desktop',
              host: '127.0.0.1',
              cover_image_url: imac,
            },
            {
              title: 'Synology NAS',
              host: '127.0.0.1',
              cover_image_url: nas,
            },
          ],
        })
      }, 1000)
    })
    const {
      data: items,
      total,
    } = result
    dispatch({
      type: ActionTypes.DEVICELIST_FETCHITEMS_SUCCEED,
      items,
      total,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.DEVICELIST_FETCHITEMS_FAIL,
      fetchItemsErrors: errors,
    })
  }
}

export const changeTable = params => (dispatch) => {
  const { pagination = {}, filters = {}, sorter = {} } = params
  dispatch({
    type: ActionTypes.DEVICELIST_CHANGETABLE_CHANGE,
    pagination,
    filters,
    sorter,
  })
}

export const searchTable = ({ isSearching }) => (dispatch) => {
  dispatch({
    type: ActionTypes.DEVICELIST_SEARCHTABLE_SEARCH,
    isSearching,
  })
}

export const editSearch = params => (dispatch) => {
  const { search } = params
  dispatch({
    type: ActionTypes.DEVICELIST_SEARCHTABLE_EDIT,
    search,
  })
}
