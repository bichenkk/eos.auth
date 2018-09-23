import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import { MENU_OPEN_KEYS } from './constants/app'

const win = window

const configureStore = () => {
  const initialState = {
    app: {
      accessToken: localStorage.getItem('accessToken'),
    },
    admin: {
      openKeys: MENU_OPEN_KEYS,
    },
  }

  const middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(require('redux-immutable-state-invariant').default()) // eslint-disable-line
    // middlewares.push(require('redux-logger').default) // eslint-disable-line
  }

  const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : f => f,
  )

  const store = createStore(reducer, initialState, storeEnhancers)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default // eslint-disable-line
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export default configureStore()
