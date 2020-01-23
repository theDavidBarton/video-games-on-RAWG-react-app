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

  changeScreen = () => {
    if (this.state.activeImage !== this.state.data.length - 1)
      this.setState({ activeImage: this.state.activeImage + 1 })
    else this.setState({ activeImage: 0 })
  }

  render() {
    const screens = this.getScreens()
    const i = this.state.activeImage
    return (
      <div className='container'>
        <div className='gallery-overlay-style position-fixed text-light'>
          <div className='row'>
            <div className='col-12 text-center'>
              <img className='gallery-img-style my-2' src={screens[i]} alt='video game' />
            </div>
            <div className='badge badge dark' onClick={this.changeScreen} style={{ zIndex: 7000 }}>
              NEXT
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageGallery
