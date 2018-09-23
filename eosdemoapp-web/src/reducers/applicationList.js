import {
  APPLICATIONLIST_FETCHITEMS_LOAD,
  APPLICATIONLIST_FETCHITEMS_SUCCEED,
  APPLICATIONLIST_FETCHITEMS_FAIL,
  APPLICATIONLIST_CHANGETABLE_CHANGE,
  APPLICATIONLIST_SEARCHTABLE_EDIT,
  APPLICATIONLIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case APPLICATIONLIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsErrors: null }
    case APPLICATIONLIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case APPLICATIONLIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsErrors: action.fetchItemsErrors ? [].concat(action.fetchItemsErrors) : null,
      }
    case APPLICATIONLIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case APPLICATIONLIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case APPLICATIONLIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
