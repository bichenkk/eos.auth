import React from 'react'
import { Form, Input, Button, Icon, InputNumber } from 'antd'
import { Link } from 'react-router-dom'
import PermissionSelect from '../PermissionSelect'

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
    const formItemLayout = {

      labelCol: {
        xs: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
      },
      hasFeedback: true,
    }
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <FormItem {...formItemLayout} label='EOS Wallet Private Key' hasFeedback>
          {getFieldDecorator('password', {
            initialValue: '5KKWVEsSR5FTF5ibPj4zstRsYLrHEsr9UePQjx6D9wfv3t7ra2B',
            rules: [{
              min: 8,
              required: true,
              whitespace: true,
            }],
          })(<Input addonBefore={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='EOS Waller Private Key' type='password' />)}
        </FormItem>
        <FormItem {...formItemLayout} label='Choose Permission accessible to EOS Account @demo_app' hasFeedback>
          {getFieldDecorator('permission', {
            rules: [{
              required: true,
            }],
          })(<PermissionSelect placeholder='Choose Your Permission' />)}
        </FormItem>
        <FormItem {...formItemLayout} label='Select an access price for @demo_app in AUT' hasFeedback>
          {getFieldDecorator('price', {
            initialValue: 0,
            rules: [{
              required: true,
            }],
          })(<Input addonBefore='AUT' />)}
        </FormItem>
        <FormItem>
          <Button
            loading={this.props.isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            Give Permission
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
      permission: Form.createFormField(formFieldValues.permission),
      price: Form.createFormField(formFieldValues.price),
    }
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(LoginForm)

export default CustomizedForm
