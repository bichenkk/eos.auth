import React from 'react'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

class ItemForm extends React.Component {
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
      <Form onSubmit={this.handleOnSubmit} autoComplete='off'>
        <FormItem hasFeedback>
          {getFieldDecorator('firstName', {
            rules: [{
              required: true,
              type: 'string',
              whitespace: true,
              message: 'Please input a valid first name.',
            }],
          })(<Input placeholder='First Name' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('lastName', {
            rules: [{
              required: true,
              type: 'string',
              whitespace: true,
              message: 'Please input a valid last name.',
            }],
          })(<Input placeholder='Last Name' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('email', {
            rules: [{
              required: true,
              type: 'email',
              whitespace: true,
              message: 'Please input a valid email.',
            }],
          })(<Input placeholder='Email' autoComplete='new-password' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              min: 8,
              required: true,
              whitespace: true,
              message: 'Please input a valid password with 8 or more characters.',
            }],
          })(<Input placeholder='Password' type='password' autoComplete='new-password' />)}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            Register
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
      firstName: Form.createFormField(formFieldValues.firstName),
      lastName: Form.createFormField(formFieldValues.lastName),
    }
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(ItemForm)

export default CustomizedForm
