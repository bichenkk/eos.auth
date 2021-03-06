import {
  DEVICELIST_FETCHITEMS_LOAD,
  DEVICELIST_FETCHITEMS_SUCCEED,
  DEVICELIST_FETCHITEMS_FAIL,
  DEVICELIST_CHANGETABLE_CHANGE,
  DEVICELIST_SEARCHTABLE_EDIT,
  DEVICELIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case DEVICELIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsErrors: null }
    case DEVICELIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case DEVICELIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsErrors: action.fetchItemsErrors ? [].concat(action.fetchItemsErrors) : null,
      }
    case DEVICELIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case DEVICELIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case DEVICELIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
