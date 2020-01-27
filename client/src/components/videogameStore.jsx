import React, { Component } from 'react'

class Store extends Component {
  render() {
    const storeElement = this.props.data
    return (
      <a href={storeElement.url} target='_blank' rel='noopener noreferrer'>
        <div className='btn btn-outline-dark m-2 p-2'>{storeElement.store.name}</div>
      </a>
    )
  }
}

export default Store
