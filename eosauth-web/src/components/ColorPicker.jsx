import React, { Component } from 'react'
import { TwitterPicker } from 'react-color'

export default class ColorPicker extends Component {
  render() {
    const value = this.props.value || '#000000'
    const buttonColorWithHash = `#${value.replace(/#/g, '')}`
    return (
      <div>
        <div
          style={{
            backgroundColor: buttonColorWithHash,
            marginBottom: '12px',
            width: '276px',
            height: '48px',
            textAlign: 'center',
            lineHeight: '48px',
            color: '#ffffff',
            borderRadius: '4px',
          }}
        >
          {buttonColorWithHash && buttonColorWithHash.toUpperCase()}
        </div>
        <TwitterPicker
          color={buttonColorWithHash}
          onChangeComplete={color => this.props.onChange(color.hex.replace(/#/g, ''))}
        />
      </div>
    )
  }
}
