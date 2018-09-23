import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Input, message } from 'antd'
import AdminLayout from '../../components/AdminLayout'
import SectionHeader from '../../components/SectionHeader'
import SectionHeaderTemplate from '../../components/SectionHeaderTemplate'
import SectionContent from '../../components/SectionContent'
import { CreateButton } from '../../components/AppButton'
import Table from './Table'
import {
  fetchItems,
  changeTable,
  searchTable,
  editSearch,
} from '../../actions/accessLogList'
import { LIST_PAGESIZE } from '../../constants/app'

const { Search } = Input
const pageTitle = 'Data Access Records'
const storeKey = 'accessLogList'
const createPath = '/access_log/create'
const editPath = '/access_log/edit'

class ItemList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleCreateButtonOnClick = this.handleCreateButtonOnClick.bind(this)
    this.handleTableOnChange = this.handleTableOnChange.bind(this)
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this)
    this.handleSearchOnClick = this.handleSearchOnClick.bind(this)
    this.handleSearchOnCancel = this.handleSearchOnCancel.bind(this)
  }

  componentDidMount() {
    this.fetchItems()
    const { isSearching } = this.props
    !isSearching && this.props.editSearch({ search: null })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchItemsLoading && nextProps.fetchItemsErrors) {
      const errorMessage = nextProps.fetchItemsErrors.map(error => error.message).join(', ')
      message.error(errorMessage)
    }
  }

  fetchItems() {
    const {
      pagination = {},
      sorter = {},
      search,
      isSearching,
      accessToken,
      items,
    } = this.props
    this.props.fetchItems({
      current: pagination.current,
      pageSize: pagination.pageSize,
      sort: sorter.columnKey,
      order: sorter.order,
      search: (isSearching && search) || null,
      items,
    }, accessToken)
  }

  handleCreateButtonOnClick(e) {
    e.preventDefault()
    this.props.history.push(createPath)
  }

  async handleTableOnChange(pagination, filters, sorter) {
    const { columnKey, field, order } = sorter
    await this.props.changeTable({
      pagination,
      filters,
      sorter: {
        columnKey,
        field,
        order,
      },
    })
    this.fetchItems()
  }

  handleSearchOnChange(e) {
    e.preventDefault()
    const search = e.target.value
    this.props.editSearch({ search })
    if (!search) {
      this.props.searchTable({ isSearching: false })
    }
  }

  async handleSearchOnClick() {
    await this.props.searchTable({ isSearching: true })
    await this.props.changeTable({})
    this.fetchItems()
  }

  async handleSearchOnCancel(e) {
    e.preventDefault()
    await this.props.editSearch({ search: null })
    await this.props.searchTable({ isSearching: false })
    await this.props.changeTable({})
    this.fetchItems()
  }

  render() {
    return (
      <div>
        <AdminLayout>
          <SectionHeader>
            <SectionHeaderTemplate
              breadcrumbRoutes={[
                { path: '/home', title: 'Home' },
                { title: pageTitle },
              ]}
              title={pageTitle}
              // buttons={
              //   <CreateButton
              //     onClick={this.handleCreateButtonOnClick}
              //   />
              // }
            />
          </SectionHeader>
          <SectionContent type='card'>
            {/* <Row type='flex' justify='space-between' style={{ marginBottom: '24px' }}>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search
                    onChange={this.handleSearchOnChange}
                    onSearch={this.handleSearchOnClick}
                    value={this.props.search}
                    enterButton
                  />
                  {
                    this.props.isSearching &&
                    <a href='' onClick={this.handleSearchOnCancel} style={{ lineHeight: 1.5, marginLeft: '12px' }}>
                      Cancel
                    </a>
                  }
                </div>
              </Col>
            </Row> */}
            <Table
              loading={this.props.isFetchItemsLoading}
              dataSource={this.props.items || []}
              pagination={this.props.pagination}
              filters={this.props.filters}
              sorter={this.props.sorter}
              onChange={this.handleTableOnChange}
              editPath={editPath}
            />
          </SectionContent>
        </AdminLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    items,
    total,
    isFetchItemsLoading,
    pagination = {},
    filters,
    sorter,
    search,
    isSearching,
    fetchItemsErrors,
  } = state[storeKey]
  const editedPagination = {
    ...pagination,
    pageSize: pagination.pageSize || LIST_PAGESIZE,
    pagination: pagination.current || 1,
  }
  return {
    accessToken: state.app.accessToken,
    items,
    total,
    isFetchItemsLoading,
    pagination: editedPagination,
    filters,
    sorter,
    search,
    isSearching,
    fetchItemsErrors,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchItems: (params, accessToken) => dispatch(fetchItems(params, accessToken)),
  changeTable: params => dispatch(changeTable(params)),
  editSearch: search => dispatch(editSearch(search)),
  searchTable: search => dispatch(searchTable(search)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList))
