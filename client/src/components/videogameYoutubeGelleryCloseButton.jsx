import React, { Component } from 'react'

class YoutubeGalleryCloseButton extends Component {
  render() {
    return (
      <div className='container'>
        <div className='gallery-close-position-style position-fixed'>
          <div className='row justify-content-end text-light m-3'>
            <div className='col youtube-gallery-close-style'>&#9587;</div>
          </div>
        </div>
      </div>
    )
  }
}

export default YoutubeGalleryCloseButton
