import React from 'react'
import { Table } from 'antd'
import { TableRowEditButton } from '../../components/AppButton'
import FormattedDate from '../../components/FormattedDate'

class ItemListTable extends React.Component {
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
      }, {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        render: value => <FormattedDate value={value} />,
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <TableRowEditButton to={`${this.props.editPath}/${record.id}`} />
          </span>
        ),
      },
    ]
    return (
      <Table
        rowKey={record => `item-row-${record.id}`}
        columns={columns}
        {...this.props}
      />
    )
  }
}

export default ItemListTable
