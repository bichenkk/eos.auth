import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const hasAccessToken = !!rest.accessToken
      return (
        <Component {...props} />
        // hasAccessToken
        //   ? <Component {...props} />
        //   : <Redirect to={{ pathname: '/login' }} />
      )
    }}
  />
)

const mapStateToProps = state => ({ accessToken: state.app.accessToken })

export default connect(mapStateToProps)(PrivateRoute)
