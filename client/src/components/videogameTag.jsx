import React, { Component } from 'react'

class Tag extends Component {
  render() {
    const tag = this.props.data
    return <div className='badge badge-dark tag-badge-margin'>{tag.language === 'eng' ? tag.name : null}</div>
  }
}

export default Tag
