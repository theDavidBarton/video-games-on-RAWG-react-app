import React, { Component } from 'react'

class TrendingVideogame extends Component {
  state = {
    response: this.props.data,
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
      const response = await fetch(`/api/videogameDetails/${this.state.response.results[this.state.value].id}`)
      const json = await response.json()
      this.setState({ detailsData: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getPoster = () => {
    const poster = this.state.response.results[this.state.value].background_image.replace(
      '/media/games/',
      '/media/resize/420/-/games/'
    )
    return poster
  }

  getTitle = () => {
    const title = this.state.response.results[this.state.value].name
    return title
  }

  getOverview = () => {
    const overview = this.state.detailsData.description
    return overview
  }

  getRating = () => {
    const rating = this.state.response.results[this.state.value].rating
    return rating
  }

  getRank = () => {
    const rank = this.state.value + 1
    return rank
  }

  selectedVideogame = () => {
    const videogame = '/videogame/' + this.state.response.results[this.state.value].id
    return videogame
  }

  render() {
    return (
      <div className='col-sm-4 col-xs-1'>
        <a href={this.selectedVideogame()} className='text-decoration-none'>
          <div className='card bg-dark text-white border-0'>
            <div>
              <div className='img-zoom-container rounded-circle'>
                <div className='img-zoom'>
                  <img className='card-img-top' alt='videogame poster' src={this.getPoster()} />
                </div>
              </div>
              <div className='badge-pill badge-info position-absolute mt-4 right-badge'>★{this.getRating()}/5</div>
            </div>
            <div className='card-body'>
              <div className='badge-pill badge-warning display-4 position-absolute badge-position'>
                #<strong>{this.getRank()}</strong>
              </div>
              <h2>{this.getTitle()}</h2>
              <div>
                {this.state.detailsData ? (
                  <div dangerouslySetInnerHTML={{ __html: this.getOverview().substring(0, 350) + '...' }}></div>
                ) : (
                  <p>'loading...'</p>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default TrendingVideogame
