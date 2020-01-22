import React, { Component } from 'react'

class PlatformBadge extends Component {
  state = {
    data: this.props.data
  }

  render() {
    const platformElement = this.state.data
    return <div className='badge badge-warning platform-badge-margin'>{platformElement.platform.name}</div>
  }
}

export default PlatformBadge
