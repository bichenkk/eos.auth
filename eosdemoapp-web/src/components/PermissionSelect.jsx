import React, { Component } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class DeviceTypeSelect extends Component {
  render() {
    return (
      <Select {...this.props} mode='multiple'>
        <Option value='personal_information'>Personal Information</Option>
        <Option value='medical_record'>Medical Record</Option>
        <Option value='photo_albums'>Photo Albums</Option>
      </Select>
    )
  }
}

// permission: ['medical_record'],
// income: 0,
// }, {
// id: 4,
// icon_image_url: 'https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-png-transparent-background-800x799.png',
// title: 'Instagram',
// eos_account: 'instagram',
// description: 'A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.',
// permission: ['personal_information', 'photo_albums'],