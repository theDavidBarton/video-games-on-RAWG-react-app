import React, { Component, Fragment } from 'react'
import Screen from './videogameScreen'
import VideogameSkeletonLoad from './videogameSkeletonLoad'
import ImageGallery from './videogameImageGallery'
import ImageGalleryCloseButton from './videogameImageGalleryCloseButton'
import Youtube from './videogameYoutube'
import YoutubeGallery from './videogameYoutubeGallery'
import YoutubeGalleryCloseButton from './videogameYoutubeGalleryCloseButton'
import OneyGallery from './videogameOneyGallery'
import Overview from './videogameOverview'
import StoresAndReviews from './videogameStoresAndReviews'
import SimilarVideogames from './videogameSimilarVideogames'
import HeaderOnVideogames from './videogameHeader'

class Videogame extends Component {
  state = {
    data: null,
    dataIsReady: false,
    archiveIdentifier: null,
    archiveOfferAvailable: false,
    id: this.props.selectedVideogame,
    galleryIsOpened: false,
    youtubeGalleryIsOpened: false,
    oneyGalleryIsOpened: false
  }

  componentDidMount() {
    this.getRawgAndArchiveApi()
  }

  getRawgAndArchiveApi = async () => {
    try {
      const response = await fetch(`/api/videogame/${this.state.id}`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
    try {
      let titleValue
      this.state.data.released && this.state.data.name.includes(this.state.data.released.match(/[0-9]{4}/))
        ? (titleValue = this.state.data.name.replace(/\([0-9]{4}\)|:.*|-|\./, '').trim())
        : (titleValue = this.state.data.name.replace(/:.*|-|\./, ''))
      const yearValue = this.state.data.released
        ? this.state.data.released.match(/[0-9]{4}/)
        : '[1960-01-01 TO 2010-01-01]'
      const response = await fetch(`/api/searchArchive?title=${titleValue}&year=${yearValue}`)
      const json = await response.json()
      const identifier = json.response.docs.length > 0 ? json.response.docs[0].identifier : null
      if (identifier) this.setState({ archiveIdentifier: identifier, archiveOfferAvailable: true })
    } catch (e) {
      console.error(e)
    }
  }

  getTitle = () => {
    try {
      let title
      this.state.data.released && this.state.data.name.includes(this.state.data.released.match(/[0-9]{4}/))
        ? (title = this.state.data.name.replace(/\([0-9]{4}\)/, '').trim())
        : (title = this.state.data.name)
      return title
    } catch (e) {
      console.error(e)
    }
  }

  getClips = () => {
    try {
      let clip, poster
      this.state.data.clip
        ? (clip = this.state.data.clip.clips[640]) &&
          (poster = this.state.data.clip['preview'].replace(
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

  setYoutubeGalleryOpen = () => {
    this.setState({ youtubeGalleryIsOpened: true })
  }

  setYoutubeGalleryClosed = () => {
    this.setState({ youtubeGalleryIsOpened: false })
  }

  setOneyGalleryOpen = () => {
    this.setState({ oneyGalleryIsOpened: true })
  }

  setOneyGalleryClosed = () => {
    this.setState({ oneyGalleryIsOpened: false })
  }

  render() {
    const data = this.state.data

    return (
      <Fragment>
        {this.state.dataIsReady ? (
          <main className='container'>
            <HeaderOnVideogames data={data} />
            <Overview data={data} dataIsReady={this.state.dataIsReady} />
            <StoresAndReviews
              data={data}
              archiveIdentifier={this.state.archiveIdentifier}
              archiveOfferAvailable={this.state.archiveOfferAvailable}
            />
            {/* galleries start here */}
            <section id='outerImageRow' className='row'>
              <section id='imageGallery' className='col'>
                <section id='imageGalleryTop' className='row mt-3 px-3'>
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
                </section>
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
            </section>
            <section id='misc' className='row'>
              {data.youtube.length > 0 ? (
                <section id='youtubeGallery' className='col-auto'>
                  <section id='youtubeGalleryTop' className='row mt-3 px-3'>
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
                  </section>
                  <section
                    id='media'
                    className='row mb-2'
                    onClick={this.setYoutubeGalleryOpen}
                    style={{ cursor: 'pointer' }}>
                    {data.youtube.slice(0, 4).map(youtubeElement => (
                      <Youtube key={youtubeElement.id} data={youtubeElement} class={''} />
                    ))}
                  </section>
                </section>
              ) : null}

              <Fragment>
                {data.oneyplays.length > 0 ? (
                  <section id='oneyplaysGallery' className='col'>
                    <section id='oneyplaysGalleryTop' className='row mt-3 px-3'>
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
                    </section>

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
            </section>
            <SimilarVideogames data={data} />
          </main>
        ) : (
          <VideogameSkeletonLoad />
        )}
      </Fragment>
    )
  }
}
export default Videogame
