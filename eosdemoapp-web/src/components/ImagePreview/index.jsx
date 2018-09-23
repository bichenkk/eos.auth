import React, { Component } from 'react'
import './index.less'

export default class ImagePreview extends Component {
  render() {
    const { src, alt, backgroundColor } = this.props
    return src && <img className='image-preview' src={src} style={{ backgroundColor: backgroundColor || 'rgb(240, 242, 245)' }} alt={alt || 'preview'} />
  }
}
