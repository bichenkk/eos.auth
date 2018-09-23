import React, { Component } from 'react'
import ImageLogo from '../ImageLogo'
import './index.less'

export default class UserSimpleProfile extends Component {
  render() {
    const {
      profile_image_url: profileImageUrl,
      first_name: firstName,
      last_name: lastName,
      email,
    } = this.props
    const name = (`${firstName || ''} ${lastName || ''}`) || '-'
    const avatarProps = {
      icon: 'user',
      style: { marginRight: '12px' },
    }
    profileImageUrl && (avatarProps.src = profileImageUrl)
    return (
      <div className='user-simple-profile'>
        <ImageLogo
          height={32}
          backgroundColor='#e6e6e6'
          src={profileImageUrl}
          alt={name}
          iconType='user'
        />
        <div className='information'>
          <div style={{ marginBottom: '3px', color: 'black' }}>{name}</div>
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.65)' }}>{email}</div>
        </div>
      </div>
    )
  }
}
