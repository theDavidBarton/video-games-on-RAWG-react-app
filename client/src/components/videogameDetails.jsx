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
    const title = this.state.data.name
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

  getTagline = () => {
    const tagline = 'tagline TBD'
    return tagline
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
    const background = this.state.data.background_image
    return background
  }

  getPoster = () => {
    const poster = this.state.data.background_image
    return poster
  }

  render() {
    let bgImage = this.state.dataIsReady
      ? 'linear-gradient(rgba(52,58,64,.6), rgba(52,58,64,.6)), url(' + this.getBackground() + ')'
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
            </header>
            {this.getTagline() === '' ? (
              <blockquote className='lead'> </blockquote>
            ) : (
              <blockquote className='blockquote-footer lead'>{this.getTagline()}</blockquote>
            )}
            <div className='row text-white greyscale-img-background' style={{ backgroundImage: bgImage }}>
              <div className='col-md-3 my-3'>
                <img src={this.getPoster()} alt='poster' className='poster-width' />
              </div>
              <div className='col m-4'>
                <div>
                  <h4>Overview:</h4>
                  <p className='mb-2'>{this.getOverview()}</p>
                </div>
                <h4>Creators:</h4>
                <div className='row'>
                  <ul className='row list-unstyled list-group list-group-horizontal'></ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3 my-3'>
                <h4>Facts:</h4>
                <strong>Company:</strong> {this.getCompanies()}
                <br />
                <strong>Duration:</strong> {this.getRuntime()} mins
                <br />
                <strong>Genre:</strong> {this.getGenres()}
                <br />
                <strong>Release:</strong> {this.getReleaseDate()}
                <br />
                <strong>Voted:</strong> ★{this.getVotes()}/10
                <br />
              </div>
              <div className='col my-3'>
                <h4>Cast:</h4>
                <ul className='list-unstyled'></ul>
                {!this.state.fullCastIsOpened ? (
                  <button className='btn btn-dark' onClick={this.setDisplayedCast}>
                    Show full cast
                  </button>
                ) : (
                  <button className='btn btn-dark' onClick={this.setBackDisplayedCast}>
                    Hide full cast
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default VideogameDetails
