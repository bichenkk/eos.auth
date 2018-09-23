import React from 'react'
import { Button, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import backgroundImage from '../../assets/doctor.jpg'
import logoWhite from '../../assets/logo-app.png'
import './index.less'

const pageTitle = 'Home'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnterButtonOnClick = this.handleEnterButtonOnClick.bind(this)
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully logged in.')
    } 
  }

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
                style={{
                  borderRadius: '50px',
                  marginBottom: '24px',
                }}
                src={logoWhite}
                alt='auth'
                height='200px'
              />
              <h1>
                Medical Demo App
              </h1>
              <h2>Telemedicine on Web</h2>
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
