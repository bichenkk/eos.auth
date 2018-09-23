import React from 'react'
import { Button, Icon, Modal } from 'antd'
import { Link } from 'react-router-dom'

export const CreateButton = props => (
  <Button type='primary' {...props}><Icon type='plus' />Add New</Button>
)

export const TableRowEditButton = props => (
  <Link to={props.to}><Icon type='edit' style={{ marginRight: '6px' }} />{ props.title || 'Edit' }</Link>
)

export const TableRowCoffeeButton = props => (
  <Link to={props.to}><Icon type='coffee' style={{ marginRight: '6px' }} />{ props.title || 'Coffee' }</Link>
)

export const TableRowGiftCardButton = props => (
  <Link to={props.to}><Icon type='gift' style={{ marginRight: '6px' }} />{ props.title || 'Gift' }</Link>
)

export const TableRowPriceButton = props => (
  <Link to={props.to}><Icon type='red-envelope' style={{ marginRight: '6px' }} />{ props.title || 'Price' }</Link>
)

export class TableRowDeleteButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    const handleOnOk = () => { this.props.deleteAction() }
    Modal.confirm({
      title: 'Delete Item',
      content: 'Are you sure to delete this item?',
      onOk() {
        handleOnOk()
      },
      onCancel() {
        // console.log('Cancel')
      },
    })
  }
  render() {
    return <a href='#' onClick={this.handleOnClick}><Icon type='delete' style={{ marginRight: '6px' }} />Delete</a>
  }
}
