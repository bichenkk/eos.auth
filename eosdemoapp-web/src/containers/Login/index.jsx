import React from 'react'
import { Card, message, Icon } from 'antd'
import { connect } from 'react-redux'
import { changeFormFields, sendLoginRequest, reset } from '../../actions/login'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import { LOGO_APP_LIGHT, THEME_PRIMARY_COLOR } from '../../constants/app'
import './index.less'

class Login extends React.Component {
  constructor(props) {
    super(props)
    props.reset()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully logged in.')
    } else if (this.props.isLoginLoading && nextProps.loginErrors) {
      const errorMessage = nextProps.loginErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  render() {
    return (
      <div
        className='login-page'
        style={{
          background: THEME_PRIMARY_COLOR,
        }}
      >
        <Card className='form'>
          <div className='header'>
            <div><img className='app-logo' src={LOGO_APP_LIGHT} height='100px' alt='Logo' /></div>
            {/* <div>
              <img className='text-logo' src={LOGO_TEXT_DARK} width='150px' alt='Text' />
            </div> */}
            <h2>Admin Portal</h2>
          </div>
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isLoginLoading}
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
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
  } = state.login
  return {
    formFieldValues,
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendLoginRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
  reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
