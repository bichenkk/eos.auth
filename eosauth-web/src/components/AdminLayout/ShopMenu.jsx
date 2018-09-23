import React from 'react'
import { Menu, Icon } from 'antd'

export default props => (
  <Menu {...props}>
    <Menu.Item key='main_menu'><Icon type='left' /><span>Back to Main Menu</span></Menu.Item>
    <Menu.Item key='dashboard'><Icon type='area-chart' /><span>Dashboard</span></Menu.Item>
    <Menu.Item key='edit'><Icon type='edit' /><span>Edit Shop Info</span></Menu.Item>
    <Menu.Item key='coffee_item'><Icon type='coffee' /><span>Coffee Items</span></Menu.Item>
    <Menu.Item key='plan_transaction'><Icon type='mobile' /><span>Coffee Redemptions</span></Menu.Item>
    <Menu.Item key='checkin'><Icon type='environment' /><span>Shop Check-Ins</span></Menu.Item>
    <Menu.Item key='shop_like'><Icon type='like' /><span>Shop Likes</span></Menu.Item>
    <Menu.Item key='shop_review'><Icon type='meh' /><span>Shop Reviews</span></Menu.Item>
  </Menu>
)
