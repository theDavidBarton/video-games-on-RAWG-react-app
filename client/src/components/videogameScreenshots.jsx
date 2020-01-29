import React, { Component, Fragment } from 'react'
import ImageGallery from './videogameImageGallery'
import ImageGalleryCloseButton from './videogameImageGalleryCloseButton'
import Screen from './videogameScreen'

class Screenshots extends Component {
  state = { galleryIsOpened: false }

  getClips = () => {
    try {
      let clip, poster
      this.props.data.clip
        ? (clip = this.props.data.clip.clips[640]) &&
          (poster = this.props.data.clip['preview'].replace(
            'media/stories-previews',
            'media/crop/600/400/stories-previews'
          ))
        : (clip = null) && (poster = null)
      return { clip, poster }
    } catch (e) {
      console.error(e)
    }
  }

  setGalleryOpen = () => {
    this.setState({ galleryIsOpened: true })
  }

  setGalleryClosed = () => {
    this.setState({ galleryIsOpened: false })
  }

  render() {
    const data = this.props.data
    return (
      <section id='imageGallery' className='col-auto'>
        <header id='imageGalleryTop' className='row mt-3 px-3'>
          <h4>Screens:</h4>
          {this.state.galleryIsOpened && window.innerWidth > 765 ? (
            <Fragment>
              <div>
                <ImageGallery data={data.screenshots} />
              </div>
              <div onClick={this.setGalleryClosed}>
                <ImageGalleryCloseButton />
              </div>
            </Fragment>
          ) : null}
        </header>
        <section id='media' className='row mb-2' onClick={this.setGalleryOpen} style={{ cursor: 'pointer' }}>
          {this.getClips().clip ? (
            <div className='col-md-3 my-3'>
              <video
                className='img-style vid-style'
                src={this.getClips().clip}
                poster={this.getClips().poster}
                playsInline
                controls
                muted
                loop></video>
            </div>
          ) : null}
          {data.screenshots.map(screenElement => (
            <Screen key={screenElement.id} data={screenElement} />
          ))}
        </section>
      </section>
    )
  }
}

export default Screenshots
