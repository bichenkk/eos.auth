import React from 'react'
import { Card, message, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  changeFormFields,
  sendRegisterRequest,
  fetchToken,
  reset,
} from '../../actions/register'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import { THEME_PRIMARY_COLOR } from '../../constants/app'
import './index.less'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
    props.reset()
    const { search } = props.location
    const searchParts = search && search.replace('?', '').split('&')
    const tokenParts = searchParts && searchParts[0].split('=')
    const token = tokenParts && tokenParts[0] === 'token' && tokenParts[1]
    if (token) {
      this.merchantInvitationToken = token
      props.fetchToken({ token })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully logged in.')
    } else if (this.props.isLoginLoading && nextProps.loginErrors) {
      const errorMessage = nextProps.loginErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    } else if (this.props.isRegisterLoading && nextProps.isRegisterSuccess) {
      message.success('You have successfully registered. Please log in now.')
    } else if (this.props.isRegisterLoading && nextProps.registerErrors) {
      const errorMessage = nextProps.registerErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  handleFormOnSubmit(formValues) {
    this.props.handleFormOnSubmit({
      ...formValues,
      token: this.merchantInvitationToken,
    })
  }

  render() {
    const { fetchTokenErrors } = this.props
    return (
      <div
        className='register-page'
        style={{
          background: THEME_PRIMARY_COLOR,
        }}
      >
        <Card className='form'>
          <div className='header'>
            <h2>Join Admin Portal</h2>
          </div>
          {
            fetchTokenErrors &&
            <Card>
              {fetchTokenErrors.map(error => error.message).join(', ')}
            </Card>
          }
          {
            !fetchTokenErrors &&
            <Form
              onSubmit={this.handleFormOnSubmit}
              onFieldsChange={this.props.handleFormOnFieldsChange}
              formFieldValues={this.props.formFieldValues}
              isLoading={this.props.isLoginLoading}
            />
          }
          <div className='login'>
            <Link to='/login'>
              <Icon type='arrow-left' style={{ marginRight: '6px' }} />
              Back to Login
            </Link>
          </div>
          <AppFooter />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isFetchTokenLoading,
    fetchTokenResult,
    fetchTokenErrors,
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
    isRegisterLoading,
    isRegisterSuccess,
    registerErrors,
  } = state.register
  return {
    formFieldValues,
    isFetchTokenLoading,
    fetchTokenResult,
    fetchTokenErrors,
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
    isRegisterLoading,
    isRegisterSuccess,
    registerErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendRegisterRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
  fetchToken: params => dispatch(fetchToken(params)),
  reset: () => dispatch(reset()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
