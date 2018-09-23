import React from 'react'
import { connect } from 'react-redux'
import { Layout, message, Icon, Row, Col } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import ImageLogo from '../ImageLogo'
import Header from './Header'
import Menu from './Menu'
import ShopMenu from './ShopMenu'
import { LOGO_APP_LIGHT } from '../../constants/app'
import {
  openChangeMenu,
  toggleSider,
  fetchMe,
  changeBreakpoint,
  fetchShop,
  resetShop,
} from '../../actions/admin'
import './index.less'

const { Sider, Content } = Layout

class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
    this.handleShopMenuItemOnClick = this.handleShopMenuItemOnClick.bind(this)
  }

  componentDidMount() {
    // this.props.fetchMe(this.props.accessToken)
    // if (this.props.type === 'shop') {
    //   this.props.fetchShop({ id: this.props.match.params.shopId }, this.props.accessToken)
    // } else {
    //   this.props.resetShop()
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchMeLoading && nextProps.fetchMeErrors) {
      const errorMessage = nextProps.fetchMeErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
      // this.props.history.push(`/`)
    } else if (this.props.isFetchShopLoading && nextProps.fetchShopErrors) {
      const errorMessage = nextProps.fetchShopErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
      this.props.history.push(`/home`)
    }
  }

  handleMenuItemOnClick(item) {
    this.props.history.push(`/${item.key}`)
  }

  handleShopMenuItemOnClick(item) {
    if (item.key === 'main_menu') {
      this.props.history.push(`/home`)
    } else {
      this.props.history.push(`/shop/${this.props.match.params.shopId}/${item.key}`)
    }
  }

  render() {
    const {
      match,
      children,
      openKeys,
      collapsed,
      onBreakpoint,
      shop,
      type,
      hasSider = true,
    } = this.props
    const me = {
      first_name: '@kkchen123456',
      email: '7 AUT',
      profile_image_url: 'https://binatir.com/assets/customised/avatar-kk.jpg',
    }
    const selectedKey = match.path.split('/').splice(1)[0]
    const shopMenuSelectedKey = match.path.split('/').splice(3)[0]
    const shopType = (type === 'shop') && shop
    return (
      <Layout className='admin-page'>
        <Header me={me} onBreakpoint={onBreakpoint} collapsed={collapsed} handleHeaderOnToggle={this.props.handleHeaderOnToggle} />
        <Layout>
          {
            hasSider && (
              <Sider>
                <Menu
                  className='menu'
                  theme='dark'
                  mode={collapsed ? 'vertical-right' : 'inline'}
                  openKeys={openKeys}
                  selectedKeys={[selectedKey]}
                  onClick={this.handleMenuItemOnClick}
                  onOpenChange={this.props.handleMenuOnOpenChange}
                />
              </Sider>
            )
          }
          <Content>{(shopType || !type) && children}</Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    openKeys,
    collapsed,
    onBreakpoint,
    me,
    isFetchMeLoading,
    fetchMeErrors,
    shop,
    isFetchShopLoading,
    fetchShopErrors,
  } = state.admin || {}
  return {
    accessToken: state.app.accessToken,
    openKeys,
    collapsed,
    onBreakpoint,
    me,
    isFetchMeLoading,
    fetchMeErrors,
    shop,
    isFetchShopLoading,
    fetchShopErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMe: accessToken => dispatch(fetchMe(accessToken)),
  handleMenuOnOpenChange: openKeys => dispatch(openChangeMenu(openKeys)),
  handleHeaderOnToggle: () => dispatch(toggleSider()),
  handleSiderOnBreakpoint: onBreakpoint => dispatch(changeBreakpoint(onBreakpoint)),
  fetchShop: (params, accessToken) => dispatch(fetchShop(params, accessToken)),
  resetShop: () => dispatch(resetShop()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
