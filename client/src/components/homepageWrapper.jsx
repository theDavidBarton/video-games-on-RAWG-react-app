import React, { Component } from 'react'
import TrendingList from './homepageTrendingList'

class HomepageWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false
  }

  componentDidMount() {
    this.getRawgApi()
  }

  getRawgApi = async () => {
    try {
      const response = await fetch('/api/trending')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div>
        <TrendingList data={this.state.data} dataIsReady={this.state.dataIsReady} />
      </div>
    )
  }
}

export default HomepageWrapper
