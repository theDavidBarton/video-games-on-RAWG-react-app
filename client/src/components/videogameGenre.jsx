import React, { Component } from 'react'

class Genre extends Component {
  state = {
    data: this.props.data,
    index: this.props.index
  }

  render() {
    const genreElement = this.state.data
    const i = this.state.index
    return <span key={i}>{`${i ? ', ' : ''} ${genreElement.name}`}</span>
  }
}

export default Genre
