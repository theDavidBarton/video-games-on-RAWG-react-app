import React, { Component } from 'react'

class Screen extends Component {
  render() {
    const screenElement = this.props.data
    return (
      <div className='col-md-3 my-3'>
        {screenElement.image ? (
          <img
            className='img-style'
            src={
              screenElement.image.match(/media\/screenshots/)
                ? screenElement.image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                : screenElement.image.replace('media/games', 'media/crop/600/400/games')
            }
            alt='screenshot of the game'
          />
        ) : null}
      </div>
    )
  }
}

export default Screen
