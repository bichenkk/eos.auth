import React from 'react'
import { Form, Input, Button, Icon, Checkbox } from 'antd'

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
          {getFieldDecorator('password', {
            rules: [{
              min: 8,
              required: true,
              whitespace: true,
              message: 'Please input a valid password with 8 or more characters.',
            }],
          })(<Input placeholder='New Password' type='password' autoComplete='new-password' />)}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            Reset Password
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
      password: Form.createFormField(formFieldValues.password),
      reset_password: Form.createFormField(formFieldValues.reset_password),
    }
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(ItemForm)

export default CustomizedForm
