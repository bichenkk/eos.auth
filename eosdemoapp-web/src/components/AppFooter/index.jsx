import React from 'react'
import { Layout } from 'antd'
import { FOOTER_CONTENT } from '../../constants/app'
import './index.less'

const { Footer } = Layout

class CustomisedFooter extends React.Component {
  render() {
    return (
      <Footer className='app-footer'>
        {FOOTER_CONTENT}
      </Footer>
    )
  }
}

export default CustomisedFooter
