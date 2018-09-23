import React from 'react'
import { Card, message, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { changeFormFields, sendForgotPasswordRequest, reset } from '../../actions/forgotPassword'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import { THEME_PRIMARY_COLOR } from '../../constants/app'
import './index.less'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    props.reset()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isForgotPasswordLoading && nextProps.isForgotPasswordSuccess) {
      message.success((
        <div style={{ marginTop: '12px' }}>
          <p>
            We&apos;ve sent an email to you. Click the link in the email to reset your password.
          </p>
          <p>
            If you don&apos;t see the email, check other places it might be, like your junk, spam
            , social, or other folders.
          </p>
        </div>
      ))
    } else if (this.props.isForgotPasswordLoading && nextProps.forgotPasswordErrors) {
      const errorMessage = nextProps.forgotPasswordErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  render() {
    return (
      <div
        className='forgot-password-page'
        style={{
          background: THEME_PRIMARY_COLOR,
        }}
      >
        <Card className='form'>
          <div className='header'>
            <h2>Forgot Password ?</h2>
            <p>We will email a link to your email.</p>
          </div>
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isForgotPasswordLoading}
          />
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
    isForgotPasswordLoading,
    isForgotPasswordSuccess,
    forgotPasswordErrors,
  } = state.forgotPassword
  return {
    formFieldValues,
    isForgotPasswordLoading,
    isForgotPasswordSuccess,
    forgotPasswordErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendForgotPasswordRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
  reset: () => dispatch(reset()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))
