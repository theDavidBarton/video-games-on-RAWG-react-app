import React, { Component, Fragment } from 'react'

class Trending extends Component {
  state = {
    data: this.props.data,
    detailsData: null,
    value: this.props.value,
    selectedVideogame: this.props.selectedVideogame,
    dataIsReady: false
  }

  componentDidMount() {
    this.getRawgApi()
  }

  getRawgApi = async () => {
    try {
      const data = await fetch(`/api/videogame/${this.state.data.results[this.state.value].id}`)
      const json = await data.json()
      this.setState({ detailsData: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getPoster = () => {
    const posterPath = this.state.data.results[this.state.value].background_image
    const poster = posterPath.match(/media\/screenshots/)
      ? posterPath.replace('media/screenshots', 'media/resize/420/-/screenshots')
      : posterPath.replace('/media/games/', '/media/resize/420/-/games/')
    return poster
  }

  getTitle = () => {
    let title
    this.state.data.results[this.state.value].released &&
    this.state.data.results[this.state.value].name.includes(
      this.state.data.results[this.state.value].released.match(/[0-9]{4}/)
    )
      ? (title = this.state.data.results[this.state.value].name.replace(/\([0-9]{4}\)/, '').trim())
      : (title = this.state.data.results[this.state.value].name)
    return title
  }

  getOverview = () => {
    const overview = this.state.detailsData.description_raw
    return overview
  }

  getPlatform = () => {
    const platformArray = this.state.detailsData.platforms
    const platform = platformArray.map((platformElement, index) => (
      <div className='badge badge-dark platform-badge-margin' key={index + 1}>
        {platformElement.platform.name}
      </div>
    ))
    return platform
  }

  getRating = () => {
    const rating = this.state.data.results[this.state.value].rating
    return rating
  }

  getRank = () => {
    const rank = this.state.value + 1
    return rank
  }

  selectedVideogame = () => {
    const videogame = `/videogame/${this.state.data.results[this.state.value].id}-${
      this.state.data.results[this.state.value].slug
    }`
    return videogame
  }

  render() {
    return (
      <div className='col-md-6'>
        <a href={this.selectedVideogame()} className='text-decoration-none'>
          <div className='card bg-dark text-white border-0'>
            <div>
              <div className='img-zoom-container card-background'>
                <div className='img-zoom'>
                  <img className='card-img-top' alt='videogame poster' src={this.getPoster()} />
                </div>
              </div>
              <div className='badge-pill badge-warning position-absolute mt-4 right-badge'>★{this.getRating()}/5</div>
            </div>
            <div className='card-body'>
              <div className='badge-pill badge-dark display-5 position-absolute badge-position'>
                #<strong>{this.getRank()}</strong>
              </div>
              <h2 className='position-absolute h2-position'>
                {this.getTitle().length >= 30
                  ? this.getTitle().substring(0, 30) + '...'
                  : this.getTitle().substring(0, 30)}
              </h2>
              <div className='position-absolute platform-badge-position'>
                {this.state.detailsData ? this.getPlatform() : null}
              </div>
              <div>
                {this.state.detailsData ? (
                  <Fragment>{this.getOverview().substring(0, 350) + '...'}</Fragment>
                ) : (
                  <Fragment>
                    {/* skeleton loading for overviews */}
                    <p className='w-100 mb-2 text-secondary bg-secondary'>&zwnj;</p>
                    <p className='w-50 mb-2 text-secondary bg-secondary'>&zwnj;</p>
                    <p className='w-75 mb-2 text-secondary bg-secondary'>&zwnj;</p>
                    <p className='w-100 mb-2 text-secondary bg-secondary'>&zwnj;</p>
                    <p className='w-50 mb-2 text-secondary bg-secondary'>&zwnj;</p>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default Trending
