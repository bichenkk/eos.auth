import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class AppTypeSelect extends Component {
  render() {
    return (
      <Select {...this.props}>
        <Option value='admin'>Admin</Option>
        <Option value='patient'>Patient</Option>
        <Option value='provider'>Provider</Option>
      </Select>
    )
  }
}
