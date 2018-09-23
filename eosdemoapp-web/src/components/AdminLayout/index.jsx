import React from 'react'
import { connect } from 'react-redux'
import { Layout, message, Icon, Row, Col, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import ImageLogo from '../ImageLogo'
import Header from './Header'
import Menu from './Menu'
import ShopMenu from './ShopMenu'
import { LOGO_APP_LIGHT } from '../../constants/app'
import eosauth from '../../assets/eos.png'
import Form from './Form'
import { changeFormFields, sendLoginRequest, reset } from '../../actions/login'
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
    this.state = { modalVisible: false }
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
    this.handleShopMenuItemOnClick = this.handleShopMenuItemOnClick.bind(this)
    this.loginButtonOnClick = this.loginButtonOnClick.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
    } else if (this.props.isFetchShopLoading && nextProps.fetchShopErrors) {
      const errorMessage = nextProps.fetchShopErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
      this.props.history.push(`/home`)
    } else if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully added @demo_app with permission medical_record.')
      this.props.history.push(`/dashboard`)
    }
  }

  handleOk() {
    this.setState({ ...this.state, modalVisible: false })
    this.props.history.push(`/dashboard`)
  }

  handleCancel() {
    this.setState({ ...this.state, modalVisible: false })
  }

  loginButtonOnClick() {
    this.props.reset()
    this.setState({ ...this.state, modalVisible: true })
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
      hideLogin = false,
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
        <Header hideLogin={hideLogin} loginButtonOnClick={this.loginButtonOnClick} me={me} onBreakpoint={onBreakpoint} collapsed={collapsed} handleHeaderOnToggle={this.props.handleHeaderOnToggle} />
        <Layout>
          {/* {
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
          } */}
          <Content>{(shopType || !type) && children}</Content>
        </Layout>
        <Modal
          className='login-modal'
          title={
            <div>
              <img height='20px' style={{ marginRight: '6px' }} src={eosauth} alt='eos.auth' />Use EOS.AUTH to Login In
            </div>
          }
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isLoginLoading}
          />
        </Modal>
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
  const {
    formFieldValues,
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
  } = state.login
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
    formFieldValues,
    isLoginLoading,
    isLoginSuccess,
    loginErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendLoginRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
  reset: () => dispatch(reset()),
  fetchMe: accessToken => dispatch(fetchMe(accessToken)),
  handleMenuOnOpenChange: openKeys => dispatch(openChangeMenu(openKeys)),
  handleHeaderOnToggle: () => dispatch(toggleSider()),
  handleSiderOnBreakpoint: onBreakpoint => dispatch(changeBreakpoint(onBreakpoint)),
  fetchShop: (params, accessToken) => dispatch(fetchShop(params, accessToken)),
  resetShop: () => dispatch(resetShop()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
