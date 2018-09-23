import {
  ACCESS_LOGLIST_FETCHITEMS_LOAD,
  ACCESS_LOGLIST_FETCHITEMS_SUCCEED,
  ACCESS_LOGLIST_FETCHITEMS_FAIL,
  ACCESS_LOGLIST_CHANGETABLE_CHANGE,
  ACCESS_LOGLIST_SEARCHTABLE_EDIT,
  ACCESS_LOGLIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ACCESS_LOGLIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsErrors: null }
    case ACCESS_LOGLIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case ACCESS_LOGLIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsErrors: action.fetchItemsErrors ? [].concat(action.fetchItemsErrors) : null,
      }
    case ACCESS_LOGLIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case ACCESS_LOGLIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case ACCESS_LOGLIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
