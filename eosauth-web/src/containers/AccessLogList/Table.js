import React from 'react'
import { Table, Button, Tag } from 'antd'
import { TableRowDeleteButton } from '../../components/AppButton'
import FormattedDate from '../../components/FormattedDate'
import ImageLogo from '../../components/ImageLogo'
import authLogo from '../../assets/logo-app.png'

class ItemListTable extends React.Component {
  render() {
    const columns = [
      {
        dataIndex: 'icon_image_url',
        key: 'icon_image_url',
        render: url => <ImageLogo src={url} width={50} borderRadius={10} />,
      }, {
        title: 'App',
        dataIndex: 'title',
        key: 'title',
        render: (value, record) => <div><p style={{ color: '#000' }}>{value}</p></div>,
        width: '100px',
      }, {
        title: 'EOS Account',
        dataIndex: 'eos_account',
        key: 'eos_account',
        widht: '200px',
      }, {
        title: 'Accessed Data',
        dataIndex: 'permission',
        key: 'permission',
        render: (value, record) => value && value.map((item) => {
          if (item === 'medical_record') {
            return <Tag style={{ marginBottom: '6px' }} key={`${record.title}${item}`} color='#7773BF'>{item}</Tag>
          } else if (item === 'personal_information') {
            return <Tag style={{ marginBottom: '6px' }} key={`${record.title}${item}`} color='#ff0000'>{item}</Tag>
          }
          return <Tag style={{ marginBottom: '6px' }} key={`${record.title}${item}`} color='#000'>{item}</Tag>
        }),
        width: '200px',
      }, {
        title: 'Generated Income',
        dataIndex: 'income',
        key: 'income',
        render: value => <span><img style={{ marginRight: '6px' }} width='20px' src={authLogo} alt='AUT' />{value} AUT</span>,
      }, {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        render: value => <FormattedDate value={value} />,
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
