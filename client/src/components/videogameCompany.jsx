import React, { Component } from 'react'

class Company extends Component {
  state = {
    data: this.props.data,
    index: this.props.index
  }

  render() {
    const companyElement = this.state.data
    const i = this.state.index
    return <span>{`${i ? ', ' : ''} ${companyElement.name}`}</span>
  }
}

export default Company
