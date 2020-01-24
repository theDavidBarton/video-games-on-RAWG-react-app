import React, { Component, Fragment } from 'react'
import DevteamMember from './videogameDevteamMember'
import PlatformBadge from './videogamePlatformBadge'
import Tag from './videogameTag'
import Suggested from './videogameSuggested'
import Screen from './videogameScreen'
import Review from './videogameReview'
import ArchiveOffer from './videogameArchiveOffer'
import Store from './videogameStore'
import Company from './videogameCompany'
import Genre from './videogameGenre'
import VideogameSkeletonLoad from './videogameSkeletonLoad'
import ImageGallery from './videogameImageGallery'
import ImageGalleryCloseButton from './videogameImageGalleryCloseButton'

class Videogame extends Component {
  state = {
    data: null,
    dataIsReady: false,
    archiveIdentifier: null,
    archiveOfferAvailable: false,
    id: this.props.selectedVideogame,
    reviewHeight: '133px',
    galleryIsOpened: false
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

  getReleaseYear = () => {
    try {
      return this.state.data.released ? this.state.data.released.match(/[0-9]{4}/) : 'n/a'
    } catch (e) {
      console.error(e)
    }
  }

  getReleaseDate = () => {
    try {
      return this.state.data.released
    } catch (e) {
      console.error(e)
    }
  }

  getOverview = () => {
    try {
      return this.state.data.description
    } catch (e) {
      console.error(e)
    }
  }

  getPlaytime = () => {
    try {
      return this.state.data.playtime
    } catch (e) {
      console.error(e)
    }
  }

  getVotes = () => {
    try {
      return this.state.data.rating
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

  getWebsite = () => {
    try {
      const website = this.state.data.website
      const websiteText = website.replace(/http:\/\/|https:\/\/|www\./g, '')
      return { website, websiteText }
    } catch (e) {
      console.error(e)
    }
  }

  getBackground = () => {
    try {
      let background
      this.state.data.background_image_additional
        ? (background = this.state.data.background_image_additional)
        : (background = this.state.data.background_image)

      if (background) {
        background.match(/media\/screenshots/)
          ? (background = background.replace('media/screenshots', 'media/crop/600/400/screenshots'))
          : (background = background.replace('media/games', 'media/crop/600/400/games'))
      }
      return background
    } catch (e) {
      console.error(e)
    }
  }

  getPoster = () => {
    try {
      let poster
      if (this.state.data.background_image) {
        this.state.data.background_image.match(/media\/screenshots/)
          ? (poster = this.state.data.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots'))
          : (poster = this.state.data.background_image.replace('media/games', 'media/crop/600/400/games'))
      }
      return poster
    } catch (e) {
      console.error(e)
    }
  }

  unnecessaryReviewReadmore = () => {
    let unnecessaryReviewReadmore
    if (this.state.data.reviews[0]) {
      this.state.data.reviews.length <= 1 && this.state.data.reviews[0].text.length < 445
        ? (unnecessaryReviewReadmore = true)
        : (unnecessaryReviewReadmore = false)
    }
    return unnecessaryReviewReadmore
  }

  setGalleryOpen = () => {
    this.setState({ galleryIsOpened: true })
  }

  setGalleryClosed = () => {
    this.setState({ galleryIsOpened: false })
  }

  setReviewsHeight = () => {
    this.setState({ reviewHeight: 'auto' })
  }

  setBackReviewsHeight = () => {
    this.setState({ reviewHeight: '133px' })
  }

  render() {
    const data = this.state.data
    const bgImage = this.state.dataIsReady
      ? 'linear-gradient(rgba(0,0,0,.9), rgba(52,58,64,.9)), url(' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

    return (
      <Fragment>
        {this.state.dataIsReady ? (
          <main className='container'>
            <header id='videogameHeader' border-bottom='1px' solid='#000'>
              <h2 className='display-4 mt-2 heading-line' id='videogameLabel' display='inline'>
                {this.getTitle()}
                <span className='lead heading-line'> ({this.getReleaseYear()}) </span>
              </h2>
              {data.platforms.map((platformBadge, i) => (
                <PlatformBadge key={i} data={platformBadge} />
              ))}
            </header>
            {data.tags.length < 1 ? (
              <section id='tags' className='my-2'>
                {' '}
              </section>
            ) : (
              <section id='tags' className='my-2'>
                {data.tags.map((tag, i) => (
                  <Tag key={i} data={tag} />
                ))}
              </section>
            )}
            <section
              id='videogameSummary'
              className='row text-white img-background details-background'
              style={{ backgroundImage: bgImage }}>
              <summary className='col-md-3 my-3'>
                <img src={this.getPoster()} alt='poster' className='img-style' />
                <div className='my-3'>
                  <h4>Facts:</h4>
                  <ul className='list-unstyled'>
                    <li>
                      <strong>Company:</strong>{' '}
                      {data.developers.map((companyElement, i) => (
                        <Company key={companyElement.id} data={companyElement} index={i} />
                      ))}
                    </li>
                    <li>
                      <strong>Playtime:</strong>{' '}
                      {this.getPlaytime() && this.getPlaytime() !== 0 ? this.getPlaytime() + ' hours' : '-'}
                    </li>
                    <li>
                      <strong>Genre:</strong>{' '}
                      {data.genres.map((genreElement, i) => (
                        <Genre key={i} data={genreElement} />
                      ))}
                    </li>
                    <li>
                      <strong>Release:</strong> {this.getReleaseDate()}
                    </li>
                    <li>
                      <strong>Voted:</strong> ★{this.getVotes()}/5
                    </li>
                    {this.getWebsite().website ? (
                      <Fragment>
                        <li>
                          <strong>Web:</strong>{' '}
                          <a
                            href={this.getWebsite().website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-secondary'>
                            {this.getWebsite().websiteText.length >= 25
                              ? this.getWebsite().websiteText.substring(0, 25) + '...'
                              : this.getWebsite().websiteText}
                          </a>
                        </li>
                      </Fragment>
                    ) : null}
                  </ul>
                </div>
              </summary>
              <article id='overview' className='col my-3'>
                <div>
                  <h4>Overview:</h4>
                  <p className='mb-2' dangerouslySetInnerHTML={{ __html: this.getOverview() }}></p>
                </div>
                <div>
                  {data.devteam.length > 0 ? (
                    <Fragment>
                      <h4>Creators:</h4>
                      <ul className='row list-unstyled list-group list-group-horizontal'>
                        {data.devteam.map(devteamMember => (
                          <DevteamMember key={devteamMember.id} data={devteamMember} />
                        ))}
                      </ul>
                    </Fragment>
                  ) : null}
                </div>
              </article>
            </section>
            <section id='storesAndReviews' className='row'>
              <div className='col-md-3'>
                {data.stores.length > 0 || this.state.archiveOfferAvailable ? (
                  <Fragment>
                    <div className='row mt-3 px-3'>
                      <h4>Get it from:</h4>
                    </div>
                    <div className='row mb-2'>
                      <Fragment>
                        {data.stores.length > 0
                          ? data.stores.map(storeElement => <Store key={storeElement.id} data={storeElement} />)
                          : null}
                      </Fragment>
                      {this.state.archiveOfferAvailable ? (
                        <ArchiveOffer archiveIdentifier={this.state.archiveIdentifier} />
                      ) : null}
                    </div>
                  </Fragment>
                ) : null}
              </div>
              <article id='reviews' className='col'>
                {data.reviews.length > 0 ? (
                  <Fragment>
                    <h4 className='row mt-3 px-3'>Reviews:</h4>
                    <div id='longContent' className='long-content' style={{ height: this.state.reviewHeight }}>
                      {data.reviews.map(reviewElement => (
                        <Review key={reviewElement.id} data={reviewElement} />
                      ))}
                    </div>
                    <div className='row justify-content-center'>
                      {this.state.reviewHeight !== 'auto' ? (
                        <Fragment>
                          {!this.unnecessaryReviewReadmore() ? (
                            <Fragment>
                              <button className='btn btn-outline-dark text-center m-3' onClick={this.setReviewsHeight}>
                                read more
                              </button>{' '}
                            </Fragment>
                          ) : null}
                        </Fragment>
                      ) : (
                        <button className='btn btn-outline-dark text-center m-3' onClick={this.setBackReviewsHeight}>
                          read less
                        </button>
                      )}
                    </div>
                  </Fragment>
                ) : null}
              </article>
            </section>
            <h4>Screens:</h4>
            <section id='imageGallery' className='row mt-3 px-3'>
              {this.state.galleryIsOpened ? (
                <Fragment>
                  <div>
                    <ImageGallery data={data.screenshots} />
                  </div>
                  <div onClick={this.setGalleryClosed}>
                    <ImageGalleryCloseButton onClick={this.setGalleryClosed} />
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
            <aside id='similarVideogames'>
              <header className='row mt-3 px-3'>
                <h4>Similar titles:</h4>
              </header>
              <section className='row mb-2 justify-content-center text-center'>
                {data.suggested.map(suggestedElement => (
                  <Suggested key={suggestedElement.id} data={suggestedElement} />
                ))}
              </section>
            </aside>
          </main>
        ) : (
          <VideogameSkeletonLoad />
        )}
      </Fragment>
    )
  }
}
export default Videogame
