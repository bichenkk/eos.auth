import React from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { keys } from '../../actions/accessLogForm'
import FormattedDate from '../../components/FormattedDate'

const FormItem = Form.Item

class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnDelete = this.handleOnDelete.bind(this)
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

  handleOnDelete(e) {
    e.preventDefault()
    const handleOnOk = () => { this.props.onDelete() }
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      okType: 'danger',
      onOk() {
        handleOnOk()
      },
      onCancel() {
        // console.log('Cancel')
      },
    })
  }

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
      hasFeedback: true,
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 7,
        },
      },
    }
    const isCreateForm = this.props.type === 'create'
    const {
      id,
      created_at: createdAt,
      updated_at: updatedAt,
    } = getFieldsValue(keys)
    return (
      <Form onSubmit={this.handleOnSubmit}>
        {
          !isCreateForm &&
          <FormItem label='ID' {...formItemLayout}>
            {id}
          </FormItem>
        }
        <FormItem label='Title' {...formItemLayout}>
          {getFieldDecorator('title', {
            rules: [{ required: true, whitespace: true, message: 'Please input a valid value.' }],
          })(<Input />)}
        </FormItem>
        {
          !isCreateForm &&
          <FormItem label='Created At' {...formItemLayout}>
            {<FormattedDate value={createdAt} />}
          </FormItem>
        }
        {
          !isCreateForm &&
          <FormItem label='Updated At' {...formItemLayout}>
            {<FormattedDate value={updatedAt} />}
          </FormItem>
        }
        <FormItem {...tailFormItemLayout}>
          <Button
            loading={this.props.isCreateItemLoading || this.props.isEditItemLoading}
            type='primary'
            htmlType='submit'
            style={{ marginRight: '12px' }}
          >
            {isCreateForm ? 'Create' : 'Save'}
          </Button>
          {
            !isCreateForm &&
            <Button
              loading={this.props.isDeleteItemLoading}
              type='danger'
              htmlType='button'
              onClick={this.handleOnDelete}
            >
              Delete
            </Button>
          }
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
    const fields = keys.reduce((prev, key) => (
      { ...prev, [key]: Form.createFormField(formFieldValues[key]) }
    ), {})
    return fields
  },
  // onValuesChange(_, values) {
  //   console.log(values)
  // },
})(ItemForm)

export default CustomizedForm
