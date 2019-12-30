import React, { Component, Fragment } from 'react'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'
import VideogameDetails from './videogameDetails'

class VideogameDetailsWrapper extends Component {
  state = {
    data: null,
    dataIsReady: false,
    selectedVideogame: this.props.match.params.id
  }

  render() {
    return (
      <Fragment>
        {this.state.selectedVideogame ? (
          <div>
            <CookieBar />
            <Header />
            <VideogameDetails selectedVideogame={this.state.selectedVideogame} />
            <Footer />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default VideogameDetailsWrapper
