import React, { Component, Fragment } from 'react'
import VideogameSkeletonLoad from './videogameSkeletonLoad'
import Overview from './videogameOverview'
import SimilarVideogames from './videogameSimilarVideogames'
import HeaderOnVideogames from './videogameHeader'
import Screenshots from './videogameScreenshots'
import YoutubeVideos from './videogameYoutubeVideos'
import OneyplaysVideos from './videogameOneyplaysVideos'
import Reviews from './videogameReviews'
import Stores from './videogameStores'

class Videogame extends Component {
  state = {
    data: null,
    dataIsReady: false,
    archiveIdentifier: null,
    archiveOfferAvailable: false,
    id: this.props.match.params.id
  }

  componentDidMount() {
    this.getRawgAndArchiveApi()
  }

  getRawgAndArchiveApi = async () => {
    const baseUrl = window.location.href.match(/localhost/) ? '' : 'https://thedavidbarton.herokuapp.com'
    try {
      const response = await fetch(baseUrl + `/api/videogame/${this.state.id}`)
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
      const response = await fetch(baseUrl + `/api/searchArchive?title=${titleValue}&year=${yearValue}`)
      const json = await response.json()
      const identifier = json.response.docs.length > 0 ? json.response.docs[0].identifier : null
      if (identifier) this.setState({ archiveIdentifier: identifier, archiveOfferAvailable: true })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const data = this.state.data
    return (
      <Fragment>
        {this.state.dataIsReady ? (
          <main className='container'>
            <HeaderOnVideogames data={data}>
              {(document.title = `${this.state.data.name} | Trending on RAWG`)}
            </HeaderOnVideogames>
            <Overview data={data} />
            <section id='storesAndReviews' className='row'>
              <Stores
                data={data}
                archiveIdentifier={this.state.archiveIdentifier}
                archiveOfferAvailable={this.state.archiveOfferAvailable}
              />
              <Reviews data={data} />
            </section>
            <section id='misc' className='row'>
              <Screenshots data={data} />
              <YoutubeVideos data={data} />
              <OneyplaysVideos data={data} />
            </section>
            <SimilarVideogames data={data} />
          </main>
        ) : (
          <VideogameSkeletonLoad>{(document.title = 'Loading game... | Trending on RAWG')}</VideogameSkeletonLoad>
        )}
      </Fragment>
    )
  }
}
export default Videogame
