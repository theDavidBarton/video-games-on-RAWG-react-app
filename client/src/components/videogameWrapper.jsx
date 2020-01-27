import React, { Component, Fragment } from 'react'
import Videogame from './videogame'

class VideogameWrapper extends Component {
  state = { selectedVideogame: this.props.match.params.id }

  render() {
    return (
      <Fragment>
        {this.state.selectedVideogame ? <Videogame selectedVideogame={this.state.selectedVideogame} /> : null}
      </Fragment>
    )
  }
}

export default VideogameWrapper
