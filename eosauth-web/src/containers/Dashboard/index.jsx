import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message, Card, Row, Col, Icon } from 'antd'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import Spin from '../../components/Spin'
import DailyTransactionCountCard from './DailyTransactionCountCard'
import {
  reset,
  fetchDashboard,
} from '../../actions/shopDashboard'
import './index.less'

const storeKey = 'shopDashboard'

class ShopDashboard extends React.Component {
  // constructor(props, context) {
  //   super(props, context)
  //   this.props.reset()
  // }

  componentDidMount() {
    this.props.fetchDashboard({ shopId: this.props.match.params.shopId }, this.props.accessToken)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchDashboardLoading && nextProps.fetchDashboardErrors) {
      const errorMessage = nextProps.fetchDashboardErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  handleFormOnDelete() {
    this.props.deleteItem({ id: this.props.match.params.shopId }, this.props.accessToken)
  }

  render() {
    const { dashboardResult = {} } = this.props
    return (
      <div className='shop-dashboard-page'>
        <AdminLayout>
          <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[{ path: '/home', title: 'Home' }, { title: 'Shop Dashboard' }]}
              title='EOS AUT Dashboard'
            />
          </SectionHeader>
          <SectionContent style={{ padding: '24px' }}>
            {
              this.props.isFetchDashboardLoading && <Card className='dashboard-card'><Spin /></Card>
            }
            {
              !this.props.isFetchDashboardLoading && dashboardResult &&
              <div>
                <Row gutter={24}>
                  <Col xs={24} sm={6}>
                    <Card className='dashboard-card'>
                      <h4>My Balance<br />in AUT</h4>
                      <h1><Icon type='bank' />{dashboardResult.balance || 0}</h1>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card className='dashboard-card'>
                      <h4>Income<br />Last 7 Days</h4>
                      <h1><Icon type='money-collect' />{dashboardResult.likeCount1Month || 0}</h1>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card className='dashboard-card'>
                      <h4>AUT Market Price<br />in USD</h4>
                      <h1><Icon type='stock' />{dashboardResult.market_price || 0}</h1>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card className='dashboard-card'>
                      <h4>Total Asset<br />in USD</h4>
                      <h1><Icon type='bank' />{(dashboardResult.market_price || 0) * dashboardResult.balance}</h1>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24}>
                    {<DailyTransactionCountCard
                      transactionCountByDate7Day={dashboardResult.transactionCountByDate7Day}
                    />}
                  </Col>
                </Row>
              </div>
            }
          </SectionContent>
        </AdminLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    isFetchDashboardLoading,
    fetchDashboardErrors,
    dashboardResult,
  } = state[storeKey]
  return {
    accessToken: state.app.accessToken,
    isFetchDashboardLoading,
    dashboardResult,
    fetchDashboardErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDashboard: (params, accessToken) => dispatch(fetchDashboard(params, accessToken)),
  reset: () => dispatch(reset()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopDashboard))
