import React from 'react'
import { Form, Input, Button, Icon, Checkbox } from 'antd'

const FormItem = Form.Item

class ForgotPasswordForm extends React.Component {
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
            rules: [{
              required: true,
              type: 'email',
              whitespace: true,
              message: 'Please input a valid email.',
            }],
          })(<Input addonBefore={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Email' />)}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            Send Reset Password Email
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
    }
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(ForgotPasswordForm)

export default CustomizedForm
