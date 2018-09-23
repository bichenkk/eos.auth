import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { message } from 'antd'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import Spin from '../../components/Spin'
import Form from './Form'
import {
  editForm,
  fetchItem,
  createItem,
  editItem,
  deleteItem,
  reset,
} from '../../actions/deviceForm'

const listPath = '/device'
const itemTitle = 'Device'
const storeKey = 'deviceForm'

class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormOnSubmit = this.handleFormOnSubmit.bind(this)
    this.handleFormOnDelete = this.handleFormOnDelete.bind(this)
    this.props.reset()
  }

  componentDidMount() {
    if (this.props.type === 'edit') {
      this.props.fetchItem(
        { id: this.props.match.params.itemId },
        this.props.accessToken,
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isCreateItemLoading && nextProps.isCreateItemSuccess) {
      message.success('You have successfully created the item.')
    } else if (this.props.isEditItemLoading && nextProps.isEditItemSuccess) {
      message.success('You have successfully edited the item.')
    } else if (this.props.isDeleteItemLoading && nextProps.isDeleteItemSuccess) {
      message.success('You have successfully deleted the item.')
    } else if (this.props.isCreateItemLoading && nextProps.createItemErrors) {
      const errorMessage = nextProps.createItemErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    } else if (this.props.isEditItemLoading && nextProps.editItemErrors) {
      const errorMessage = nextProps.editItemErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    } else if (this.props.isDeleteItemLoading && nextProps.deleteItemErrors) {
      const errorMessage = nextProps.deleteItemErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    } else if (this.props.isFetchItemLoading && nextProps.fetchItemErrors) {
      const errorMessage = nextProps.fetchItemErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  async handleFormOnSubmit(values) {
    if (this.props.type === 'create') {
      this.props.createItem(
        values,
        this.props.accessToken,
      )
    } else {
      const item = { ...this.props.item, ...values }
      await this.props.editItem(
        item,
        this.props.accessToken,
      )
      this.props.fetchItem({
        id: this.props.match.params.itemId,
        isRefreshing: true,
      }, this.props.accessToken)
    }
  }

  handleFormOnDelete() {
    this.props.deleteItem(
      { id: this.props.match.params.itemId },
      this.props.accessToken,
    )
  }

  render() {
    const { type, isCreateItemSuccess, isDeleteItemSuccess } = this.props
    const isCreateForm = type === 'create'
    const actionTitle = isCreateForm ? 'Create' : 'Edit'
    if (isCreateItemSuccess || isDeleteItemSuccess) {
      return <Redirect to={listPath} />
    }
    return (
      <div>
        <AdminLayout>
          <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[
                { path: '/home', title: 'Home' },
                { path: listPath, title: itemTitle },
                { title: actionTitle },
              ]}
              title={`${actionTitle} ${itemTitle}`}
            />
          </SectionHeader>
          <SectionContent type='card'>
            {
              this.props.isFetchItemLoading && <Spin />
            }
            {
              (isCreateForm || (!isCreateForm && this.props.item)) &&
              <Form
                onSubmit={this.handleFormOnSubmit}
                onDelete={this.handleFormOnDelete}
                onFieldsChange={this.props.editForm}
                formFieldValues={this.props.formFieldValues}
                isCreateItemLoading={this.props.isCreateItemLoading}
                isEditItemLoading={this.props.isEditItemLoading}
                isDeleteItemLoading={this.props.isDeleteItemLoading}
                type={this.props.type}
              />
            }
          </SectionContent>
        </AdminLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isFetchItemLoading,
    isEditItemLoading,
    isCreateItemLoading,
    isCreateItemSuccess,
    isEditItemSuccess,
    isDeleteItemLoading,
    isDeleteItemSuccess,
    item,
    fetchItemErrors,
    createItemErrors,
    editItemErrors,
    deleteItemErrors,
  } = state[storeKey]
  return {
    accessToken: state.app.accessToken,
    isFetchItemLoading,
    formFieldValues,
    isEditItemLoading,
    isCreateItemLoading,
    isCreateItemSuccess,
    isEditItemSuccess,
    isDeleteItemLoading,
    isDeleteItemSuccess,
    item,
    fetchItemErrors,
    createItemErrors,
    editItemErrors,
    deleteItemErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  createItem: (params, accessToken) => dispatch(createItem(params, accessToken)),
  editItem: (params, accessToken) => dispatch(editItem(params, accessToken)),
  fetchItem: (params, accessToken) => dispatch(fetchItem(params, accessToken)),
  deleteItem: (params, accessToken) => dispatch(deleteItem(params, accessToken)),
  editForm: formFieldsChange => dispatch(editForm(formFieldsChange)),
  reset: () => dispatch(reset()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemForm))
