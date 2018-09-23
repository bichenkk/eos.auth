import React from 'react'
import { Table, Icon, Tag } from 'antd'
import _ from 'lodash'
import { TableRowEditButton } from '../../components/AppButton'
import FormattedDate from '../../components/FormattedDate'
import UserSimpleProfile from '../../components/UserSimpleProfile'

class ItemListTable extends React.Component {
  render() {
    const columns = [
      {
        //   title: 'ID',
        //   dataIndex: 'id',
        //   key: 'id',
        //   sorter: true,
        // }, {
        title: 'Permission Name',
        dataIndex: 'title',
        key: 'title',
        render: (item, record) => <div>{item}<br /><Tag style={{ marginTop: '6px' }} color={record.color || '#000'} >{_.snakeCase(item)}</Tag></div>,
      }, {
        title: 'Source',
        dataIndex: 'device',
        key: 'device',
        render: item => <div><Icon type='database' style={{ marginRight: '12px' }} />{item}</div>,
      }, {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
      }, {
        title: 'Data Path',
        dataIndex: 'data_path',
        key: 'data_path',
      },
      //   title: 'Created At',
      //   dataIndex: 'created_at',
      //   key: 'created_at',
      //   sorter: true,
      //   render: value => <FormattedDate value={value} />,
      // }, {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <span>
      //       <TableRowEditButton to={`${this.props.editPath}/${record.id}`} />
      //     </span>
      //   ),
      // },
    ]
    return (
      <Table
        rowKey={record => `item-row-${record.title}`}
        columns={columns}
        {...this.props}
      />
    )
  }
}

export default ItemListTable
