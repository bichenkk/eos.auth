import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

export default class ImageLogo extends Component {
  render() {
    const {
      src,
      alt = 'preview',
      backgroundColor = '#e8e8e8',
      iconType,
      width,
      height,
      borderColor = '#e8e8e8',
      borderRadius,
    } = this.props
    const sizeWidth = (width || height) || 100
    return (
      <div className='image-logo'>
        {
          src
            ? (
              <img
                src={src}
                style={{
                  backgroundColor,
                  borderRadius: `${borderRadius || sizeWidth / 2}px`,
                  width: `${sizeWidth}px`,
                  height: `${sizeWidth}px`,
                  borderColor,
                }}
                alt={alt}
              />
            )
            : (
              <div
                className='placeholder'
                style={{
                  backgroundColor,
                  width: `${sizeWidth}px`,
                  height: `${sizeWidth}px`,
                  borderRadius: `${sizeWidth / 2}px`,
                  fontSize: `${sizeWidth / 2}px`,
                  borderColor,
                }}
              >
                <Icon
                  type={iconType}
                  style={{
                    fontSize: `${sizeWidth / 2}px`,
                  }}
                />
              </div>
            )
        }
      </div>
    )
  }
}

