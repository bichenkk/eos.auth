import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'

export const reset = () => ({
  type: ActionTypes.SHOPDASHBOARD_ENTER_RESET,
})

export const fetchDashboard = (params, accessToken) => async (dispatch) => {
  dispatch({ type: ActionTypes.SHOPDASHBOARD_FETCHDASHBOARD_LOAD })
  try {
    const result = await new Promise((resolve, reject) => {
      return setTimeout(() => {
        return resolve({
          balance: 7,
          last_seven_day: 7,
          market_price: 10,
          transactionCountByDate7Day: [
            {
              'date': '2018-09-17',
              'count': 0
            },
            {
              'date': '2018-09-18',
              'count': 0
            },
            {
              'date': '2018-09-19',
              'count': 0
            },
            {
              'date': '2018-09-20',
              'count': 0
            },
            {
              'date': '2018-09-21',
              'count': 0
            },
            {
              'date': '2018-09-22',
              'count': 0
            },
            {
              'date': '2018-09-23',
              'count': 7
            }
          ],
        })
      }, 3000)
    })
    dispatch({
      type: ActionTypes.SHOPDASHBOARD_FETCHDASHBOARD_SUCCEED,
      dashboardResult: result,
    })
  } catch (errors) {
    dispatch({
      type: ActionTypes.SHOPDASHBOARD_FETCHDASHBOARD_FAIL,
      fetchDashboardErrors: errors,
    })
  }
}
