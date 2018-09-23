import React from 'react'
import { Card, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeFormFields, sendResetPasswordRequest, reset } from '../../actions/resetPassword'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import { THEME_PRIMARY_COLOR } from '../../constants/app'
import './index.less'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    props.reset()
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
  }

  componentDidMount() {
    const { search } = this.props.location
    const searchParts = search && search.replace('?', '').split('&')
    const tokenParts = searchParts && searchParts[0].split('=')
    const token = tokenParts && tokenParts[0] === 'token' && tokenParts[1]
    if (token) {
      this.resetPasswordToken = token
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isResetPasswordLoading && nextProps.isResetPasswordSuccess) {
      message.success('You have successfully reset your password.')
      this.props.history.push('/login')
    } else if (this.props.isResetPasswordLoading && nextProps.resetPasswordErrors) {
      const errorMessage = nextProps.resetPasswordErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  handleFormOnSubmit(formValues) {
    this.props.handleFormOnSubmit({
      ...formValues,
      token: this.resetPasswordToken,
    })
  }

  render() {
    return (
      <div
        className='reset-password-page'
        style={{
          background: THEME_PRIMARY_COLOR,
        }}
      >
        <Card className='form'>
          <div className='header'>
            <h2>Reset Password</h2>
          </div>
          <Form
            onSubmit={this.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isResetPasswordLoading}
          />
          <AppFooter />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isResetPasswordLoading,
    isResetPasswordSuccess,
    resetPasswordErrors,
  } = state.resetPassword
  return {
    formFieldValues,
    isResetPasswordLoading,
    isResetPasswordSuccess,
    resetPasswordErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendResetPasswordRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
  reset: () => dispatch(reset()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))
