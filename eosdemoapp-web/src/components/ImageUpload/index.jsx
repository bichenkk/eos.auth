import React, { Component } from 'react'
import { Upload, Button, Icon, message, Modal } from 'antd'
import { connect } from 'react-redux'
import api from '../../utils/api'
import './index.less'

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.upload = this.upload.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onPreview = this.onPreview.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      fileList: [],
    }
    this.uploadImage = async (data) => {
      const { file } = data
      try {
        const response = await api.uploadImage(null, file, this.props.accessToken)
        const imageUrl = response.url
        if (imageUrl) {
          const currentFileList = (this.props.multiple && this.state.fileList) || []
          const updatedFileList = [...currentFileList, {
            uid: currentFileList.length,
            name: imageUrl.split('/').slice(-1)[0],
            status: 'done',
            url: imageUrl,
            thumbUrl: imageUrl,
          }]
          this.uploadImage && this.setState({
            fileList: updatedFileList,
          })
          const imageUrls = updatedFileList.map(item => item.url).join(',')
          this.uploadImage && this.props.onChange && this.props.onChange(imageUrls)
          data.onSuccess()
        } else {
          this.uploadImage && this.props.onFailure && this.props.onFailure()
          data.onError()
        }
      } catch (error) {
        const errors = [].concat(error)
        const errorMessage = errors.map(item => item.message).join(', ')
        message.error(errorMessage)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    const imageUrls = (value && value.split(',')) || null
    const fileList = (imageUrls && imageUrls.map((url, index) => ({
      uid: index,
      name: url.split('/').slice(-1)[0],
      status: 'done',
      url,
      thumbUrl: url,
    })))
    this.setState({
      fileList,
    })
  }

  componentWillUnmount() {
    this.setState({
      fileList: [],
    })
    this.uploadImage = null
  }

  onChange(info) {
    const { status } = info.file
    if (status === 'done') {
      message.success('The image is uploaded.')
    } else if (status === 'error') {
      message.error('Please upload the image again.')
    }
  }

  onRemove(file) {
    const fileList = this.state.fileList.filter(item => item.uid !== file.uid)
    this.setState({
      fileList,
    })
    const imageUrls = (fileList.length > 0 && fileList.map(item => item.url).join(',')) || null
    this.props.onChange && this.props.onChange(imageUrls)
  }

  onPreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewImageName: file.name || '',
      previewVisible: true,
    })
  }

  handleCancel() {
    this.setState({ previewVisible: false })
  }

  async upload(data) {
    this.setState({ ...this.state, loading: true })
    await this.uploadImage(data)
    this.setState({ ...this.state, loading: false })
  }

  render() {
    const {
      previewVisible,
      previewImage,
      previewImageName,
      fileList = [],
      loading,
    } = this.state
    const props = {
      listType: 'picture-card',
      onChange: this.onChange,
      onRemove: this.onRemove,
      onPreview: this.onPreview,
      customRequest: this.upload,
      fileList,
    }
    const {
      multiple,
    } = this.props
    const uploadButton = (
      (multiple || !fileList || fileList.length === 0) &&
      <div>
        <Icon type={loading ? 'loading' : 'upload'} style={{ marginRight: '6px' }} />
        {loading ? 'Uploading' : 'Upload'}
      </div>
    )
    return (
      <div>
        <Upload className='app-image-upload' {...props}>
          {uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={
            <div
              style={{
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
              {previewImageName}
            </div>
          }
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.app.accessToken,
})

export default connect(mapStateToProps)(ImageUpload)
