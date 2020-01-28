import React, { Component, Fragment } from 'react'
import YoutubeGallery from './videogameYoutubeGallery'
import YoutubeGalleryCloseButton from './videogameYoutubeGalleryCloseButton'
import Youtube from './videogameYoutube'

class YoutubeVideos extends Component {
  state = { youtubeGalleryIsOpened: false }

  getTitle = () => {
    try {
      let title
      this.props.data.released && this.props.data.name.includes(this.props.data.released.match(/[0-9]{4}/))
        ? (title = this.props.data.name.replace(/\([0-9]{4}\)/, '').trim())
        : (title = this.props.data.name)
      return title
    } catch (e) {
      console.error(e)
    }
  }

  setYoutubeGalleryOpen = () => {
    this.setState({ youtubeGalleryIsOpened: true })
  }

  setYoutubeGalleryClosed = () => {
    this.setState({ youtubeGalleryIsOpened: false })
  }

  render() {
    const data = this.props.data
    return (
      <Fragment>
        {data.youtube.length > 0 ? (
          <section id='youtubeGallery' className='col-auto'>
            <header id='youtubeGalleryTop' className='row mt-3 px-3'>
              <h4>On YouTube:</h4>
              <p className='w-100'>
                Check out these gameplay videos about <i>{this.getTitle()}</i> on YouTube.
              </p>
              {this.state.youtubeGalleryIsOpened ? (
                <Fragment>
                  <div>
                    <YoutubeGallery data={data.youtube} />
                  </div>
                  <div onClick={this.setYoutubeGalleryClosed}>
                    <YoutubeGalleryCloseButton />
                  </div>
                </Fragment>
              ) : null}
            </header>
            <section id='media' className='row mb-2' onClick={this.setYoutubeGalleryOpen} style={{ cursor: 'pointer' }}>
              {data.youtube.slice(0, 4).map(youtubeElement => (
                <Youtube key={youtubeElement.id} data={youtubeElement} class={''} />
              ))}
            </section>
          </section>
        ) : null}
      </Fragment>
    )
  }
}

export default YoutubeVideos
