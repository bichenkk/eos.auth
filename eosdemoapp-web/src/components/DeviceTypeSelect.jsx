import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class DeviceTypeSelect extends Component {
  render() {
    return (
      <Select {...this.props}>
        <Option value='iMac Desktop'>iMac Desktop</Option>
        <Option value='Synology NAS'>Synology NAS</Option>
      </Select>
    )
  }
}
