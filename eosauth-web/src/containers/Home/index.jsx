import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import backgroundImage from '../../assets/trochus-dark.jpg'
import logoWhite from '../../assets/logo-full-white.png'
import './index.less'

const pageTitle = 'Home'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnterButtonOnClick = this.handleEnterButtonOnClick.bind(this)
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  handleEnterButtonOnClick() {
    this.props.history.push(`/permission`)
  }

  render() {
    return (
      <div className='home-page'>
        <AdminLayout hasSider={false}>
          {/* <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[{ path: '/home', title: 'Home' }, { title: pageTitle }]}
              title={pageTitle}
            />
          </SectionHeader> */}
          <SectionContent>
            <div
              className='home-banner'
              style={{
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <img
                src={logoWhite}
                alt='auth'
                height='300px'
              />
              <h1>
                The First Rewardable Authentication Service<br />on EOS Blockchain
              </h1>
              <Button
                onClick={this.handleEnterButtonOnClick}
                type='dashed'
                size='large'
              >Enter Admin Panel
              </Button>
            </div>
          </SectionContent>
        </AdminLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
