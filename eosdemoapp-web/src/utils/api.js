import qs from 'qs'
import { logout } from '../actions/app'

const uploadImagePath = 'asset_image'

class Api {
  constructor({ url }) {
    this.apiUrl = url
  }

  async get(dispatch, endpoint, query = {}, accessToken) {
    return this.call(dispatch, endpoint, query, 'GET', accessToken)
  }

  async post(dispatch, endpoint, data, accessToken) {
    return this.call(dispatch, endpoint, data, 'POST', accessToken)
  }

  async patch(dispatch, endpoint, data, accessToken) {
    return this.call(dispatch, endpoint, data, 'PATCH', accessToken)
  }

  async delete(dispatch, endpoint, data, accessToken) {
    return this.call(dispatch, endpoint, data, 'DELETE', accessToken)
  }

  async uploadImage(dispatch, data, accessToken) {
    return this.call(dispatch, uploadImagePath, data, 'POST', accessToken)
  }

  async call(dispatch, endpoint, data, method, accessToken) {
    const param = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    if (accessToken) {
      param.headers.Authorization = `Bearer ${accessToken}`
    }
    if (method !== 'GET') {
      if (endpoint === uploadImagePath) {
        const formData = new FormData()
        formData.append('file', data, data.name)
        delete param.headers['Content-Type']
        param.body = formData
      } else {
        param.body = JSON.stringify(data)
      }
    }
    const url = method === 'GET' ? `${endpoint}?${qs.stringify(data)}` : endpoint
    if (process.env.NODE_ENV === 'development') {
      console.log('API', method, endpoint, data, accessToken) // eslint-disable-line
    }
    try {
      const res = await fetch(`${this.apiUrl}/${url}`, param)
      if (endpoint === `plan_transaction/export`) {
        return Promise.resolve({})
      }
      const json = await res.json()
      if (res.status >= 200 && res.status <= 300) {
        return Promise.resolve(json)
      }
      if (dispatch && res.status === 401) {
        dispatch(logout())
      }
      return Promise.reject(json.errors)
    } catch (error) {
      const errors = [{ message: error.message || 'Please try again later.' }]
      return Promise.reject(errors)
    }
  }
}

export default new Api({ url: window.API_URL })
