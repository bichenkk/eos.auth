import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'

export default class InputPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'password',
    }
    this.handleCheckboxOnChange = this.handleCheckboxOnChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || ''
      this.setState(Object.assign({}, this.state, { value }))
    }
  }

  handleCheckboxOnChange(e) {
    const { checked } = e.target
    const type = checked ? 'text' : 'password'
    this.setState(Object.assign({}, this.state, { type }))
  }

  render() {
    const { type } = this.state
    return (
      <div>
        <Input {...this.props} type={type} autoComplete='new-password' />
        <Checkbox onChange={this.handleCheckboxOnChange}>Show Password</Checkbox>
      </div>
    )
  }
}
