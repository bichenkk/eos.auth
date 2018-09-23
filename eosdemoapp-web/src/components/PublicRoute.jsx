import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const hasAccessToken = !!rest.accessToken
      return (
        hasAccessToken
          ? <Redirect to={{ pathname: '/' }} />
          : <Component {...props} />
      )
    }}
  />
)

const mapStateToProps = state => ({ accessToken: state.app.accessToken })

export default connect(mapStateToProps)(PublicRoute)
