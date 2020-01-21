import React, { Component, Fragment } from 'react'
import DevteamMember from './videogameDevteamMember'
import PlatformBadge from './videogamePlatformBadge'
import Tag from './videogameTag'

class Videogame extends Component {
  state = {
    data: null,
    dataIsReady: false,
    archiveIdentifier: null,
    archiveOfferAvailable: false,
    id: this.props.selectedVideogame,
    reviewHeight: '133px'
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
      const overView = this.state.data.description
      return overView
    } catch (e) {
      console.error(e)
    }
  }

  getRuntime = () => {
    try {
      const runtime = this.state.data.playtime
      return runtime
    } catch (e) {
      console.error(e)
    }
  }

  getVotes = () => {
    try {
      const votes = this.state.data.rating
      return votes
    } catch (e) {
      console.error(e)
    }
  }

  // ⚠️ _MARKED for making it as component! ⚠️

  // _article: https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578
  getGenres = () => {
    try {
      const genresArray = this.state.data.genres ? this.state.data.genres : []
      const genres = genresArray.map((genreElement, index) => (
        <span key={index + 1}>{(index ? ', ' : '') + genreElement.name}</span>
      ))
      return genres
    } catch (e) {
      console.error(e)
    }
  }

  // ⚠️ _MARKED for making it as component! ⚠️
  getCompanies = () => {
    try {
      const companiesArray = this.state.data.developers ? this.state.data.developers : []
      const companies = companiesArray.map((companyElement, index) => (
        <span key={index + 1}>{(index ? ', ' : '') + companyElement.name}</span>
      ))
      return companies
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

  // ⚠️ _MARKED for making it as component! ⚠️
  getStores = () => {
    try {
      const storesArray = this.state.data.stores ? this.state.data.stores : []
      const stores = storesArray.map(storeElement => (
        <Fragment key={storeElement.id}>
          <a href={storeElement.url} target='_blank' rel='noopener noreferrer'>
            <div className='btn btn-outline-dark m-2 p-2'>{storeElement.store.name}</div>
          </a>
        </Fragment>
      ))
      return stores
    } catch (e) {
      console.error(e)
    }
  }

  // ⚠️ _MARKED for making it as component! ⚠️
  getArchiveOffers = () => {
    try {
      const archiveUrl = `https://archive.org/details/${this.state.archiveIdentifier}`
      const archive = (
        <Fragment>
          <a href={archiveUrl} target='_blank' rel='noopener noreferrer'>
            <div className='btn btn-outline-info m-2 p-2'>
              <small className='smaller-free'>FREE</small> <strong>Archive.org</strong>
            </div>
          </a>
        </Fragment>
      )
      return archive
    } catch (e) {
      console.error(e)
    }
  }

  // ⚠️ _MARKED for making it as component! ⚠️
  getReviews = () => {
    let reviews
    let noMoreReadmore
    try {
      const reviewsArray = this.state.data.reviews ? this.state.data.reviews : []
      reviews = reviewsArray.map(reviewElement => (
        <Fragment key={reviewElement.id}>
          <div>{'★'.repeat(reviewElement.rating) + '☆'.repeat(5 - reviewElement.rating)}</div>
          <p dangerouslySetInnerHTML={{ __html: reviewElement.text }}></p>
          <strong>by {reviewElement.user ? reviewElement.user.username : reviewElement.external_author} </strong>
          <small>{reviewElement.created ? reviewElement.created.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) : 'n/a'}</small>
          <hr />
        </Fragment>
      ))
    } catch (e) {
      console.error(e)
    }
    try {
      if (reviews[0]) {
        noMoreReadmore =
          reviews.length <= 1 && reviews[0].props.children[1].props.dangerouslySetInnerHTML.__html.length < 445
            ? (noMoreReadmore = true)
            : (noMoreReadmore = false)
      }
    } catch (e) {
      console.error(e)
    }
    return { reviews, noMoreReadmore }
  }

  // ⚠️ _MARKED for making it as component! ⚠️
  getScreens = () => {
    try {
      const screensArray = this.state.data.screenshots ? this.state.data.screenshots : []
      const screens = screensArray.map(screenElement => (
        <div key={screenElement.id} className='col-md-3 my-3'>
          {screenElement.image ? (
            <img
              className='img-style'
              src={
                screenElement.image.match(/media\/screenshots/)
                  ? screenElement.image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                  : screenElement.image.replace('media/games', 'media/crop/600/400/games')
              }
              alt='screenshot of the game'
            />
          ) : null}
        </div>
      ))
      return screens
    } catch (e) {
      console.error(e)
    }
  }

  // ⚠️ _MARKED for making it as component! ⚠️
  getSuggested = () => {
    try {
      const suggestedArray = this.state.data.suggested ? this.state.data.suggested : []
      const suggested = suggestedArray.map(suggestedElement => (
        <Fragment key={suggestedElement.id}>
          {suggestedElement.background_image ? (
            <div
              key={suggestedElement.id}
              className='col-lg-2 col-5 m-2 p-4 suggested-game-style'
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(52,58,64,.2)), url(${
                  suggestedElement.background_image.match(/media\/screenshots/)
                    ? suggestedElement.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                    : suggestedElement.background_image.replace('media/games', 'media/crop/600/400/games')
                })`,
                backgroundSize: 'cover'
              }}>
              <a className='text-decoration-none' href={`/videogame/${suggestedElement.id}-${suggestedElement.slug}`}>
                <h5 className='text-light suggestion-h2'>
                  {suggestedElement.name.length >= 30
                    ? suggestedElement.name.substring(0, 30) + '...'
                    : suggestedElement.name}
                </h5>
                <div>
                  {suggestedElement.platforms.map((platformElement, index) => (
                    <PlatformBadge data={platformElement} key={index} />
                  ))}
                </div>
              </a>
            </div>
          ) : null}
        </Fragment>
      ))
      return suggested
    } catch (e) {
      console.error(e)
    }
  }

  setReviewsHeight = () => {
    this.setState({ reviewHeight: 'auto' })
  }

  setBackReviewsHeight = () => {
    this.setState({ reviewHeight: '133px' })
  }

  render() {
    let bgImage = this.state.dataIsReady
      ? 'linear-gradient(rgba(0,0,0,.9), rgba(52,58,64,.9)), url(' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
    return (
      <Fragment>
        {this.state.dataIsReady ? (
          <div className='container'>
            <header border-bottom='1px' solid='#000'>
              <h2 className='display-4 mt-2 heading-line' id='videogameLabel' display='inline'>
                {this.getTitle()}
                <span className='lead heading-line'> ({this.getReleaseYear()}) </span>
              </h2>
              {this.state.data.platforms.map((platformBadge, index) => (
                <PlatformBadge key={index} data={platformBadge} />
              ))}
            </header>
            {this.state.data.tags.length < 1 ? (
              <div className='my-2'> </div>
            ) : (
              <div className='my-2'>
                {this.state.data.tags.map((tag, index) => (
                  <Tag key={index} data={tag} />
                ))}
              </div>
            )}
            <div className='row text-white img-background details-background' style={{ backgroundImage: bgImage }}>
              <div className='col-md-3 my-3'>
                <img src={this.getPoster()} alt='poster' className='img-style' />
                <div className='my-3'>
                  <h4>Facts:</h4>
                  <ul className='list-unstyled'>
                    <li>
                      <strong>Company:</strong> {this.getCompanies()}
                    </li>

                    <li>
                      <strong>Playtime:</strong>{' '}
                      {this.getRuntime() && this.getRuntime() !== 0 ? this.getRuntime() + ' hours' : '-'}
                    </li>
                    <li>
                      <strong>Genre:</strong> {this.getGenres()}
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
                            {this.getWebsite().websiteText.length >= 26
                              ? this.getWebsite().websiteText.substring(0, 26) + '...'
                              : this.getWebsite().websiteText}
                          </a>
                        </li>
                      </Fragment>
                    ) : null}
                  </ul>
                </div>
              </div>
              <div className='col my-3'>
                <div>
                  <h4>Overview:</h4>
                  <p className='mb-2' dangerouslySetInnerHTML={{ __html: this.getOverview() }}></p>
                </div>
                <div>
                  {this.state.data.devteam.length > 0 ? (
                    <Fragment>
                      <h4>Creators:</h4>
                      <ul className='row list-unstyled list-group list-group-horizontal'>
                        {this.state.data.devteam.map(devteamMember => (
                          <DevteamMember key={devteamMember.id} data={devteamMember} />
                        ))}
                      </ul>
                    </Fragment>
                  ) : null}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3'>
                {this.getStores().length > 0 || this.state.archiveOfferAvailable ? (
                  <Fragment>
                    <div className='row mt-3 px-3'>
                      <h4>Get it from:</h4>
                    </div>
                    <div className='row mb-2'>
                      <Fragment>{this.getStores().length > 0 ? this.getStores() : null}</Fragment>
                      <Fragment>{this.state.archiveOfferAvailable ? this.getArchiveOffers() : null}</Fragment>
                    </div>
                  </Fragment>
                ) : null}
              </div>
              <div className='col'>
                {this.getReviews().reviews.length > 0 ? (
                  <Fragment>
                    <h4 className='row mt-3 px-3'>Reviews:</h4>
                    <div id='longContent' className='long-content' style={{ height: this.state.reviewHeight }}>
                      {this.getReviews().reviews}
                    </div>
                    <div className='row justify-content-center'>
                      {this.state.reviewHeight !== 'auto' ? (
                        <Fragment>
                          {!this.getReviews().noMoreReadmore ? (
                            <Fragment>
                              <div className='btn btn-outline-dark text-center m-3' onClick={this.setReviewsHeight}>
                                read more
                              </div>{' '}
                            </Fragment>
                          ) : null}
                        </Fragment>
                      ) : (
                        <div className='btn btn-outline-dark text-center m-3' onClick={this.setBackReviewsHeight}>
                          read less
                        </div>
                      )}
                    </div>
                  </Fragment>
                ) : null}
              </div>
            </div>
            <div className='row mt-3 px-3'>
              <h4>Screens:</h4>
            </div>
            <div className='row mb-2'>
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
              {this.getScreens()}
            </div>
            <div className='row mt-3 px-3'>
              <h4>Similar titles:</h4>
            </div>
            <div className='row mb-2 justify-content-center text-center'>{this.getSuggested()}</div>
          </div>
        ) : (
          <div className='container'>
            <div className='row text-center'>
              <div className='col-12 p-5'>
                <h3 className='loading-game p-3'>Loading Game</h3>
                <div className='spinner-border text-dark justify-content-center loading-anim-size mb-5' role='status'>
                  <span className='sr-only'>Loading Game</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}
export default Videogame
