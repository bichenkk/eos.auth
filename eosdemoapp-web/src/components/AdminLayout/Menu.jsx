import React from 'react'
import { Menu, Icon } from 'antd'

// const { SubMenu } = Menu

export default props => (
  <Menu {...props}>
    <Menu.Item key='dashboard'><Icon type='pie-chart' /><span>Dashboard</span></Menu.Item>
    <Menu.Item key='access_log'><Icon type='solution' /><span>Access Record</span></Menu.Item>
    <Menu.Item key='application'><Icon type='solution' /><span>Approved Application</span></Menu.Item>
    <Menu.Item key='permission'><Icon type='lock' /><span>My Permission List</span></Menu.Item>
    {/* <Menu.Item key='user'><Icon type='solution' /><span>User</span></Menu.Item> */}
    <Menu.Item key='device'><Icon type='database' /><span>My Device List</span></Menu.Item>
    {/* <SubMenu key='shop_related' title={<span><Icon type='shop' /><span>Shops</span></span>}>
      <Menu.Item key='shop'><Icon type='shop' /><span>My Coffee Shops</span></Menu.Item>
      <Menu.Item key='merchant_shop_request'><Icon type='to-top' /><span>My Shop Requests</span></Menu.Item>
    </SubMenu> */}
  </Menu>
)
