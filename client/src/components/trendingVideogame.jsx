import React, { Component } from 'react'

class TrendingVideogame extends Component {
  state = {
    response: this.props.data,
    value: this.props.value,
    selectedVideogame: this.props.selectedVideogame
  }

  getPoster = () => {
    const poster = this.state.response.results[this.state.value].background_image
    return poster
  }

  getTitle = () => {
    const title = this.state.response.results[this.state.value].name
    return title
  }

  getOverview = () => {
    const overview = 'n/a' // this.state.response.results[this.state.value].overview
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
              <div className='img-zoom-container'>
                <div className='img-zoom'>
                  <img className='card-img-top' alt='videogame poster' src={this.getPoster()} />
                </div>
              </div>
              <div className='badge-pill badge-warning position-absolute mt-4 right-badge'>★{this.getRating()}/10</div>
            </div>
            <div className='card-body'>
              <div className='badge-pill badge-danger display-4 position-absolute badge-position'>
                #<strong>{this.getRank()}</strong>
              </div>
              <h2>{this.getTitle()}</h2>
              <p>{this.getOverview()}</p>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

export default TrendingVideogame
