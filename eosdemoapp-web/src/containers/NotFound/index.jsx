import React from 'react'
import { Card } from 'antd'
import AppFooter from '../../components/AppFooter'
import { LOGO_APP_LIGHT, THEME_PRIMARY_COLOR } from '../../constants/app'
import './index.less'

class NotFound extends React.Component {
  render() {
    return (
      <div
        className='not-found-page'
        style={{
          background: THEME_PRIMARY_COLOR,
        }}
      >
        <Card className='container'>
          <div className='header'>
            <div><img className='app-logo' src={LOGO_APP_LIGHT} height='100px' alt='Logo' /></div>
            <h1>404 Not Found</h1>
            <p>Sorry, that page doesn&apos;t exist!</p>
          </div>
          <AppFooter />
        </Card>
      </div>
    )
  }
}

export default NotFound
