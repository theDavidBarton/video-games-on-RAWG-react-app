import React, { Component } from 'react'

class Company extends Component {
  render() {
    const companyElement = this.props.data
    const i = this.props.index
    return <span>{`${i ? ', ' : ''} ${companyElement.name}`}</span>
  }
}

export default Company
