import {
  SHOPDASHBOARD_ENTER_RESET,
  SHOPDASHBOARD_FETCHDASHBOARD_LOAD,
  SHOPDASHBOARD_FETCHDASHBOARD_SUCCEED,
  SHOPDASHBOARD_FETCHDASHBOARD_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SHOPDASHBOARD_ENTER_RESET:
      return {}
    case SHOPDASHBOARD_FETCHDASHBOARD_LOAD:
      return {
        ...state,
        isFetchDashboardLoading: true,
        fetchDashboardErrors: null,
      }
    case SHOPDASHBOARD_FETCHDASHBOARD_SUCCEED:
      return {
        ...state,
        isFetchDashboardLoading: false,
        dashboardResult: action.dashboardResult,
      }
    case SHOPDASHBOARD_FETCHDASHBOARD_FAIL:
      return {
        ...state,
        isFetchDashboardLoading: false,
        fetchDashboardErrors: action.fetchDashboardErrors ? [].concat(action.fetchDashboardErrors) : null,
      }
    default:
      return state
  }
}
