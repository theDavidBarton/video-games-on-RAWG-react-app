import React, { Component } from 'react'

class PlatformBadge extends Component {
  state = {
    data: this.props.data
  }

  render() {
    return <div className='badge badge-warning platform-badge-margin'>{this.state.data.platform.name}</div>
  }
}

export default PlatformBadge
