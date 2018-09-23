import React from 'react'
import { Table, Icon } from 'antd'
import { TableRowEditButton } from '../../components/AppButton'
import FormattedDate from '../../components/FormattedDate'
import ImageLogo from '../../components/ImageLogo'

class ItemListTable extends React.Component {
  render() {
    const columns = [
      {
        dataIndex: 'cover_image_url',
        key: 'cover_image_url',
        render: item => <ImageLogo width={50} src={item} />,
        // render: item => <div><Icon type='database' style={{ marginRight: '12px' }} />{item}</div>,
      },
      {
        title: 'Source',
        dataIndex: 'title',
        key: 'title',
        render: item => <div><Icon type='database' style={{ marginRight: '12px' }} />{item}</div>,
      }, {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
      },
      {
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
