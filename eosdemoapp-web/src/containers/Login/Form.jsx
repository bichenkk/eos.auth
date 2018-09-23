import React from 'react'
import { Form, Input, Button, Icon, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      this.props.onSubmit(values)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <FormItem hasFeedback>
          {getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: 'Please input a valid email.' }],
          })(<Input addonBefore={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              min: 8,
              required: true,
              whitespace: true,
              message: 'Please input a valid password with 8 or more characters.',
            }],
          })(<Input addonBefore={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Password' type='password' />)}
        </FormItem>
        <div className='extra-items'>
          <FormItem className='remember-me'>
            {getFieldDecorator('remember_me', {
              valuePropName: 'checked',
              initialValue: true,
              rules: [{ required: true, message: 'Please input a valid value.' }],
            })(<Checkbox>Remember Me</Checkbox>)}
          </FormItem>
          <Link to='/forgot_password'>
            Forgot Password
          </Link>
        </div>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            Login
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onFieldsChange(changedFields)
  },
  mapPropsToFields(props) {
    const { formFieldValues = {} } = props
    return {
      email: Form.createFormField(formFieldValues.email),
      password: Form.createFormField(formFieldValues.password),
      remember_me: Form.createFormField(formFieldValues.remember_me),
    }
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(LoginForm)

export default CustomizedForm
