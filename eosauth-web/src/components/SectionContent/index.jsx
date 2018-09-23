import React from 'react'
import { Card } from 'antd'
import AppFooter from '../AppFooter'
import './index.less'

class SectionHeader extends React.Component {
  render() {
    const { type, style } = this.props
    return (
      <div className='section-container' style={style}>
        {
          type === 'card'
            ? <Card className='section-content'>{this.props.children}</Card>
            : this.props.children
        }
      </div>
    )
  }
}

export default SectionHeader
