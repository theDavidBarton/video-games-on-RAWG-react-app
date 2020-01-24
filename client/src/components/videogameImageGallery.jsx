import React, { Component } from 'react'

class ImageGallery extends Component {
  state = {
    data: this.props.data,
    activeImage: 0
  }

  getScreens = () => {
    const screenPath = this.state.data
    const screens = screenPath.map(screenElement =>
      screenElement.image.match(/media\/screenshots/)
        ? screenElement.image.replace('media/screenshots', 'media/resize/1280/-/screenshots')
        : screenElement.image.replace('media/games', 'media/resize/1280/-/games')
    )
    return screens
  }

  changeScreenNext = () => {
    if (this.state.activeImage !== this.state.data.length - 1)
      this.setState({ activeImage: this.state.activeImage + 1 })
    else this.setState({ activeImage: 0 })
  }

  changeScreenBack = () => {
    if (this.state.activeImage !== 0) this.setState({ activeImage: this.state.activeImage - 1 })
    else this.setState({ activeImage: this.state.data.length - 1 })
  }

  render() {
    const screens = this.getScreens()
    const i = this.state.activeImage
    return (
      <div className='container'>
        <div className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
          <div className='row mx-auto'>
            <div className='col-12 text-center'>
              <img
                className='gallery-img-style p-md-2 p-0'
                src={screens[i]}
                onClick={this.changeScreenNext}
                alt='video game'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageGallery
