import React, { Component, Fragment } from 'react'
import OneyGallery from './videogameOneyGallery'
import YoutubeGalleryCloseButton from './videogameYoutubeGalleryCloseButton'
import Youtube from './videogameYoutube'

class OneyplaysVideos extends Component {
  state = { oneyGalleryIsOpened: false }

  setOneyGalleryOpen = () => {
    this.setState({ oneyGalleryIsOpened: true })
  }

  setOneyGalleryClosed = () => {
    this.setState({ oneyGalleryIsOpened: false })
  }
  render() {
    const data = this.props.data
    return (
      <Fragment>
        {data.oneyplays.length > 0 ? (
          <section id='oneyplaysGallery' className='col'>
            <header id='oneyplaysGalleryTop' className='row mt-3 px-3'>
              <h4>On-ey Plays:</h4>
              <p className='w-100'>
                This title appeared on{' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.youtube.com/channel/UCO1ITICo8MLHGAXR1uzFwjA'>
                  OneyPlays
                </a>
                . Brought to you by{' '}
                <a target='_blank' rel='noopener noreferrer' href='https://www.npmjs.com/package/oneyplays-api'>
                  oneyplays-api
                </a>
                .
              </p>
              {this.state.oneyGalleryIsOpened ? (
                <Fragment>
                  <div>
                    <OneyGallery data={data.oneyplays} />
                  </div>
                  <div onClick={this.setOneyGalleryClosed}>
                    <YoutubeGalleryCloseButton />
                  </div>
                </Fragment>
              ) : null}
            </header>

            <section
              id='media'
              className='row mb-2 oney-background'
              onClick={this.setOneyGalleryOpen}
              style={{
                backgroundImage: `url(${data.oneyplays[0].yt_thumbnail.replace('mqdefault', 'maxresdefault')})`
              }}>
              {data.oneyplays.map(youtubeElement => (
                <Youtube key={youtubeElement.id} data={youtubeElement} class={'oney-img-style'} />
              ))}
            </section>
          </section>
        ) : null}
      </Fragment>
    )
  }
}

export default OneyplaysVideos
