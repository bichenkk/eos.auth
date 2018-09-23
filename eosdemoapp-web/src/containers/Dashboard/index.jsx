import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { message, Card, Row, Col, Icon, Tag, Button } from 'antd'
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
  constructor(props, context) {
    super(props, context)
    this.handleDownloadButton1OnClick = this.handleDownloadButton1OnClick.bind(this)
    this.handleDownloadButton2OnClick = this.handleDownloadButton2OnClick.bind(this)
  }

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

  handleDownloadButton1OnClick() {
    const url = `https://s3-ap-southeast-1.amazonaws.com/binatir.dev/doctor_report_1.pdf`
    const win = window.open(url, '_blank')
    win.focus()
  }

  handleDownloadButton2OnClick() {
    const url = `https://s3-ap-southeast-1.amazonaws.com/binatir.dev/doctor_report_2.pdf`
    const win = window.open(url, '_blank')
    win.focus()
  }

  render() {
    const { dashboardResult = {} } = this.props
    return (
      <div className='shop-dashboard-page'>
        <AdminLayout hideLogin>
          <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[{ path: '/home', title: 'Home' }, { title: 'Shop Dashboard' }]}
              title='Medical Demo App can access the following data'
            />
          </SectionHeader>
          <SectionContent style={{ padding: '24px' }}>
            {
              this.props.isFetchDashboardLoading && <Card style={{ textAlign: 'center' }} className='dashboard-card'><Spin /> Decrypting Data From Storage </Card>
            }
            {
              !this.props.isFetchDashboardLoading && dashboardResult &&
              <div>
                <Row gutter={24}>
                  <Col xs={24}>
                    <Card className='dashboard-card'>
                      <Tag style={{ marginBottom: '6px' }} color='#7773BF'>medical_record</Tag>
                      <h2>Host: Synology NAS</h2>
                      <h2>Path: volume1/private/medial</h2>
                      <h1>doctor_report_1.pdf</h1>
                      <Button icon='download' onClick={this.handleDownloadButton1OnClick}>Download</Button>
                    </Card>
                  </Col>
                  <Col xs={24}>
                    <Card className='dashboard-card'>
                      <Tag style={{ marginBottom: '6px' }} color='#7773BF'>medical_record</Tag>
                      <h2>Host: Synology NAS</h2>
                      <h2>Path: volume1/private/medial</h2>
                      <h1>doctor_report_2.pdf</h1>
                      <Button icon='download' onClick={this.handleDownloadButton2OnClick}>Download</Button>
                    </Card>
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
