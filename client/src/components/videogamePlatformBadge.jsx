import React, { Component } from 'react'

class PlatformBadge extends Component {
  render() {
    const platformElement = this.props.data
    return <div className='badge badge-warning platform-badge-margin'>{platformElement.platform.name}</div>
  }
}

export default PlatformBadge
