import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../actions/app'
import logo from '../../assets/logo-app.png'
import eosauth from '../../assets/eos.png'
import UserSimpleProfile from '../../components/UserSimpleProfile'

const { Header } = Layout
const { SubMenu } = Menu

class CustomisedHeader extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
  }

  handleMenuItemOnClick(item) {
    switch (item.key) {
      case 'logout': {
        const handleAppLogOut = () => { this.props.handleAppLogOut() }
        Modal.confirm({
          title: 'Logout',
          content: 'Are you sure you want to log out?',
          onOk() {
            handleAppLogOut()
          },
          onCancel() {
          },
        })
        break
      }
      default:
    }
  }

  render() {
    const {
      me = {},
      collapsed,
      // onBreakpoint,
      handleHeaderOnToggle,
      hideLogin = false,
    } = this.props
    const meProfileImageUrl = me.profile_image_url || ''
    const meAvatarProps = {
      icon: 'user',
      style: { marginRight: '12px' },
    }
    meProfileImageUrl && (meAvatarProps.src = meProfileImageUrl)
    return (
      <Header className='admin-header' style={{ background: '#fff', padding: 0 }}>
        {/* {
          onBreakpoint && collapsed &&
          <div className='logo'>
            <img src={LOGO_APP_DARK} alt='Admin Portal' />
          </div>
        } */}
        {/* <Icon
          className='trigger'
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleHeaderOnToggle}
        /> */}
        <div className='logo'>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              height='35px'
            />
          </Link>
        </div>
        {
          !hideLogin &&
          <div className='eos-auth'>
            <Button onClick={this.props.loginButtonOnClick} size='large'><img height='20px' style={{ marginRight: '6px' }} src={eosauth} alt='eos.auth' />Use EOS.AUTH to Login In</Button>
          </div>
        }
        {/* <Menu
          mode='horizontal'
          selectable={false}
          style={{ lineHeight: '64px' }}
          onClick={this.handleMenuItemOnClick}
        >
          <SubMenu
            title={
              <UserSimpleProfile {...me} />
            }
          >
            <Menu.Item key='logout'>Logout</Menu.Item>
          </SubMenu>
        </Menu> */}
      </Header>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  handleAppLogOut: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomisedHeader)
