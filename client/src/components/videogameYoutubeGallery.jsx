import React, { Component } from 'react'

class YoutubeGallery extends Component {
  state = { activeVideo: 0 }

  getVideos = () => {
    const videoPath = this.props.data
    return videoPath.map(videoElement => videoElement.external_id)
  }

  changeVideoNext = () => {
    if (this.state.activeVideo !== this.props.data.length - 1)
      this.setState({ activeVideo: this.state.activeVideo + 1 })
    else this.setState({ activeVideo: 0 })
  }

  changeVideoBack = () => {
    if (this.state.activeVideo !== 0) this.setState({ activeVideo: this.state.activeVideo - 1 })
    else this.setState({ activeVideo: this.props.data.length - 1 })
  }

  render() {
    const videos = this.getVideos()
    const i = this.state.activeVideo
    return (
      <main className='container'>
        <div id='galleryOverlay' className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
          <section className='row mx-auto justify-content-center text-center'>
            <button
              className='col-1 my-auto bg-dark text-light gallery-youtube-nav-back-style'
              onClick={this.changeVideoBack}>
              &#9664;
            </button>
            <div className='col-10' style={{ minWidth: '480px' }}>
              <iframe
                className='gallery-youtube-style p-md-2 p-0'
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${videos[i]}?autoplay=0`}></iframe>
            </div>
            <button
              className='col-1 my-auto bg-dark text-light gallery-youtube-nav-next-style'
              onClick={this.changeVideoNext}>
              &#9654;
            </button>
          </section>
        </div>
      </main>
    )
  }
}

export default YoutubeGallery
