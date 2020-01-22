import React, { Component } from 'react'

class Tag extends Component {
  state = {
    data: this.props.data
  }

  render() {
    const tag = this.state.data
    return <div className='badge badge-dark tag-badge-margin'>{tag.language === 'eng' ? tag.name : null}</div>
  }
}

export default Tag
