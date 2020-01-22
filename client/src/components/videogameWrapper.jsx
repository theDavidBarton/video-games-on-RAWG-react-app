import React, { Component, Fragment } from 'react'
import Videogame from './videogame'

class VideogameWrapper extends Component {
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
            <Videogame selectedVideogame={this.state.selectedVideogame} />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default VideogameWrapper
