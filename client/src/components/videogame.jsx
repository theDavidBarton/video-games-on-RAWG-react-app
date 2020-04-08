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
    oldgameshelfIdentifier: null,
    oldgameshelfOfferAvailable: false,
    snesnowIdentifier: null,
    snesnowfOfferAvailable: false,
    id: this.props.match.params.id
  }

  componentDidMount() {
    this.getRawgAndArchiveApi()
  }

  getRawgAndArchiveApi = async () => {
    const getTitleValue = () => {
      let titleValue
      this.state.data.released && this.state.data.name.includes(this.state.data.released.match(/[0-9]{4}/))
        ? (titleValue = this.state.data.name.replace(/\([0-9]{4}\)|:.*|-|\./, '').trim())
        : (titleValue = this.state.data.name.replace(/:.*|-|\./, ''))
      return titleValue
    }

    try {
      // _RAWG game details call
      const response = await fetch(`/api/videogame/${this.state.id}`)
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
    try {
      // _Archive.org call
      const titleValue = getTitleValue()
      const yearValue = this.state.data.released ? this.state.data.released.match(/[0-9]{4}/) : null
      if (yearValue) {
        const response = await fetch(`/api/searchArchive?title=${titleValue}&year=${yearValue}`)
        const json = await response.json()
        const identifier = json.response.docs.length > 0 ? json.response.docs[0].identifier : null
        if (identifier) this.setState({ archiveIdentifier: identifier, archiveOfferAvailable: true })
      }
    } catch (e) {
      console.error(e)
    }
    try {
      // _NES call
      const titleValue = getTitleValue()
      const isNES = this.state.data.platforms.filter(el => {
        if (el.platform.name === 'NES') return el
        return null
      })
      if (isNES.length > 0) {
        const response = await fetch(`/api/searchOldgameshelf?title=${titleValue}`)
        const json = await response.json()
        if (json[0] !== undefined)
          this.setState({ oldgameshelfIdentifier: `${json[0].slug}-${json[0].uid}`, oldgameshelfOfferAvailable: true })
      }
    } catch (e) {
      console.error(e)
    }
    try {
      // _SNES call
      const titleValue = getTitleValue()
      const isSNES = this.state.data.platforms.filter(el => {
        if (el.platform.name === 'SNES') return el
        return null
      })
      if (isSNES.length > 0) {
        const response = await fetch(`/api/searchSnesnow?title=${titleValue}`)
        const json = await response.json()
        if (json[0] !== undefined)
          this.setState({ snesnowIdentifier: `${json[0].slug}-${json[0].id}`, snesnowOfferAvailable: true })
      }
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
                oldgameshelfIdentifier={this.state.oldgameshelfIdentifier}
                oldgameshelfOfferAvailable={this.state.oldgameshelfOfferAvailable}
                snesnowIdentifier={this.state.snesnowIdentifier}
                snesnowOfferAvailable={this.state.snesnowOfferAvailable}
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
