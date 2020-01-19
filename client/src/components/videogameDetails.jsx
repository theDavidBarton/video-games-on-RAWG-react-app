import React, { Component, Fragment } from 'react'

class VideogameDetails extends Component {
  state = {
    data: null,
    dataIsReady: false,
    id: this.props.selectedVideogame,
    displayedCastMembers: 5,
    fullCastIsOpened: false
  }

  componentDidMount() {
    this.getRawgApi()
  }

  getRawgApi = async () => {
    try {
      const response = await fetch(`/api/videogameDetails/${this.state.id}`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getTitle = () => {
    let title
    this.state.data.released && this.state.data.name.includes(this.state.data.released.match(/[0-9]{4}/))
      ? (title = this.state.data.name.replace(/\([0-9]{4}\)/, '').trim())
      : (title = this.state.data.name)
    console.log(this.state.data)
    return title
  }

  getReleaseYear = () => {
    const releaseYear = this.state.data.released ? this.state.data.released.match(/[0-9]{4}/) : 'n/a'
    return releaseYear
  }

  getReleaseDate = () => {
    const releaseDate = this.state.data.released
    return releaseDate
  }

  getTags = () => {
    const tagsArray = this.state.data.tags
    const tags = tagsArray.map((tagElement, index) => (
      <div className='badge badge-dark tag-badge-margin' key={index + 1}>
        {tagElement.language === 'eng' ? tagElement.name : null}
      </div>
    ))
    return tags
  }

  getOverview = () => {
    const overView = this.state.data.description
    return overView
  }

  getRuntime = () => {
    const runtime = this.state.data.playtime
    return runtime
  }

  getVotes = () => {
    const votes = this.state.data.rating
    return votes
  }

  getGenres = () => {
    const genresArray = this.state.data.genres
    const genres = genresArray.map((genreElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + genreElement.name}</span>
    ))
    return genres
  }

  getCompanies = () => {
    const companiesArray = this.state.data.developers
    const companies = companiesArray.map((companyElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + companyElement.name}</span>
    ))
    return companies
  }

  getBackground = () => {
    let background
    this.state.data.background_image_additional
      ? (background = this.state.data.background_image_additional)
      : (background = this.state.data.background_image)

    background.match(/media\/screenshots/)
      ? (background = background.replace('media/screenshots', 'media/crop/600/400/screenshots'))
      : (background = background.replace('media/games', 'media/crop/600/400/games'))

    return background
  }

  getPoster = () => {
    let poster

    this.state.data.background_image.match(/media\/screenshots/)
      ? (poster = this.state.data.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots'))
      : (poster = this.state.data.background_image.replace('media/games', 'media/crop/600/400/games'))

    return poster
  }

  getScreens = () => {
    const screensArray = this.state.data.screenshots
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
  }

  getSuggested = () => {
    const suggestedArray = this.state.data.suggested
    const suggested = suggestedArray.map(suggestedElement => (
      <div key={suggestedElement.id} className='col-md-3'>
        {suggestedElement.background_image ? (
          <Fragment>
            <a className='text-decoration-none' href={`/videogame/${suggestedElement.id}-${suggestedElement.slug}`}>
              <img
                className='suggestion-img-style rounded-circle'
                src={
                  suggestedElement.background_image.match(/media\/screenshots/)
                    ? suggestedElement.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                    : suggestedElement.background_image.replace('media/games', 'media/crop/600/400/games')
                }
                alt='suggested game'
              />
              <h5 className='badge badge-dark'>{suggestedElement.name}</h5>
            </a>
          </Fragment>
        ) : null}
      </div>
    ))
    return suggested
  }

  getPlatform = () => {
    const platformArray = this.state.data.platforms
    const platform = platformArray.map((platformElement, index) => (
      <div className='badge badge-warning platform-badge-margin' key={index + 1}>
        {platformElement.platform.name}
      </div>
    ))
    return platform
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
              <h2 className='display-4 mt-2 heading-line' id='videogameDetailsLabel' display='inline'>
                {this.getTitle()}
                <span className='lead heading-line'> ({this.getReleaseYear()}) </span>
              </h2>
              {this.getPlatform()}
            </header>
            {this.getTags().length < 1 ? <div className='my-2'> </div> : <div className='my-2'>{this.getTags()}</div>}
            <div className='row text-white img-background details-background' style={{ backgroundImage: bgImage }}>
              <div className='col-md-3 my-3'>
                <img src={this.getPoster()} alt='poster' className='img-style' />
                <div className='my-3'>
                  <h4>Facts:</h4>
                  <strong>Company:</strong> {this.getCompanies()}
                  <br />
                  <strong>Playtime:</strong>{' '}
                  {this.getRuntime() && this.getRuntime() !== 0 ? this.getRuntime() + ' hours' : '-'}
                  <br />
                  <strong>Genre:</strong> {this.getGenres()}
                  <br />
                  <strong>Release:</strong> {this.getReleaseDate()}
                  <br />
                  <strong>Voted:</strong> ★{this.getVotes()}/5
                  <br />
                </div>
              </div>
              <div className='col my-3'>
                <div>
                  <h4>Overview:</h4>
                  <p className='mb-2' dangerouslySetInnerHTML={{ __html: this.getOverview() }}></p>
                </div>
              </div>
            </div>
            <div className='row mt-3 px-3'>
              <h4>Screens:</h4>
            </div>
            <div className='row mb-2'>{this.getScreens()}</div>
            <div className='row mt-3 px-3'>
              <h4>Similar titles:</h4>
            </div>
            <div className='row mb-2 text-center'>{this.getSuggested()}</div>
          </div>
        ) : (
          <div className='container'>
            <div className='row text-center'>
              <div className='col-12 p-5'>
                <h3 className='loading-game'>Loading Game</h3>
                <div className='spinner-border text-dark justify-content-center loading-anim-size' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}
export default VideogameDetails
