import {
  PERMISSIONLIST_FETCHITEMS_LOAD,
  PERMISSIONLIST_FETCHITEMS_SUCCEED,
  PERMISSIONLIST_FETCHITEMS_FAIL,
  PERMISSIONLIST_CHANGETABLE_CHANGE,
  PERMISSIONLIST_SEARCHTABLE_EDIT,
  PERMISSIONLIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case PERMISSIONLIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsErrors: null }
    case PERMISSIONLIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case PERMISSIONLIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsErrors: action.fetchItemsErrors ? [].concat(action.fetchItemsErrors) : null,
      }
    case PERMISSIONLIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case PERMISSIONLIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case PERMISSIONLIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
