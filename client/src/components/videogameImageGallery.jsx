import React, { Component } from 'react'
import LeftArrow from './mediaLeftArrow'
import RightArrow from './mediaRightArrow'

class ImageGallery extends Component {
  state = { activeImage: 0 }

  getScreens = () => {
    const screenPath = this.props.data
    const screens = screenPath.map(screenElement =>
      screenElement.image.match(/media\/screenshots/)
        ? screenElement.image.replace('media/screenshots', 'media/resize/1280/-/screenshots')
        : screenElement.image.replace('media/games', 'media/resize/1280/-/games')
    )
    return screens
  }

  changeScreenNext = () => {
    if (this.state.activeImage !== this.props.data.length - 1)
      this.setState({ activeImage: this.state.activeImage + 1 })
    else this.setState({ activeImage: 0 })
  }

  changeScreenBack = () => {
    if (this.state.activeImage !== 0) this.setState({ activeImage: this.state.activeImage - 1 })
    else this.setState({ activeImage: this.props.data.length - 1 })
  }

  render() {
    const screens = this.getScreens()
    const i = this.state.activeImage
    return (
      <main className='container'>
        <div id='galleryOverlay' className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
          <section className='row mx-auto justify-content-center text-center'>
            <button
              style={{ maxWidth: '45px' }}
              className='col my-auto bg-dark text-light gallery-nav-back-style'
              onClick={this.changeScreenBack}>
              <LeftArrow />
            </button>
            <div className='col-10'>
              <img className='gallery-img-style p-md-2 p-0' src={screens[i]} alt='video game' />
            </div>
            <button
              style={{ maxWidth: '45px' }}
              className='col my-auto bg-dark text-light gallery-nav-next-style'
              onClick={this.changeScreenNext}>
              <RightArrow />
            </button>
          </section>
        </div>
      </main>
    )
  }
}

export default ImageGallery
