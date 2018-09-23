import React, { Component } from 'react'
import { Select } from 'antd'
import { connect } from 'react-redux'
import api from '../utils/api'

const { Option } = Select

class RegionSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.fetchItems = async () => {
      const result = await api.get(null, 'region', {
        $offset: 0,
        $limit: 100000,
      }, this.props.accessToken)
      this.fetchItems && this.setState({ items: result.data })
    }
    this.fetchItems()
  }

  componentWillUnmount() {
    this.fetchItems = null
  }

  render() {
    const { items = [] } = this.state
    const value = (this.props.value && `${this.props.value}`) || undefined
    return (
      <Select {...this.props} value={value} disabled={this.props.disabled || items.length === 0} placeholder='Select Region'>
        {
          items.map(item => (<Option key={`${item.id}`} value={`${item.id}`}>{item.title}</Option>))
        }
      </Select>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.app.accessToken,
})

export default connect(mapStateToProps)(RegionSelect)
