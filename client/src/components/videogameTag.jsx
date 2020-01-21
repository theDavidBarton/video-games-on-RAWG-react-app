import React, { Component } from 'react'

class Tag extends Component {
  state = {
    data: this.props.data
  }

  render() {
    return (
      <div className='badge badge-dark tag-badge-margin'>
        {this.state.data.language === 'eng' ? this.state.data.name : null}
      </div>
    )
  }
}

export default Tag
