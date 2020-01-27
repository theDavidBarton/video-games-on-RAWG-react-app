import React, { Component } from 'react'

class Youtube extends Component {
  render() {
    const youtubeElement = this.props.data.thumbnails.medium.url
    return (
      <div className='col-md-3 my-3'>
        <span className='position-absolute bg-dark text-light youtube-play-style'>►</span>
        {youtubeElement ? (
          <img className={`img-style ${this.props.class}`} src={youtubeElement} alt='screenshot of the video' />
        ) : null}
      </div>
    )
  }
}

export default Youtube
