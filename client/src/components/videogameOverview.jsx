import React, { Component, Fragment } from 'react'
import dompurify from 'dompurify'
import Company from './videogameCompany'
import Genre from './videogameGenre'
import DevteamMember from './videogameDevteamMember'

class Overview extends Component {
  getBackground = () => {
    try {
      let background
      this.props.data.background_image_additional
        ? (background = this.props.data.background_image_additional)
        : (background = this.props.data.background_image)

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
      if (this.props.data.background_image) {
        this.props.data.background_image.match(/media\/screenshots/)
          ? (poster = this.props.data.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots'))
          : (poster = this.props.data.background_image.replace('media/games', 'media/crop/600/400/games'))
      }
      return poster
    } catch (e) {
      console.error(e)
    }
  }

  getWebsite = () => {
    try {
      const website = this.props.data.website
      const websiteText = website.replace(/http:\/\/|https:\/\/|www\./g, '')
      return { website, websiteText }
    } catch (e) {
      console.error(e)
    }
  }

  getOverview = () => {
    try {
      return this.props.data.description
    } catch (e) {
      console.error(e)
    }
  }

  getPlaytime = () => {
    try {
      return this.props.data.playtime
    } catch (e) {
      console.error(e)
    }
  }

  getVotes = () => {
    try {
      return this.props.data.rating
    } catch (e) {
      console.error(e)
    }
  }

  getReleaseDate = () => {
    try {
      return this.props.data.released
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const data = this.props.data
    const bgImage = this.getBackground()
      ? 'linear-gradient(rgba(0,0,0,.9), rgba(52,58,64,.9)), url(' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'
    return (
      <section
        id='videogameSummary'
        className='row text-white img-background details-background'
        style={{ backgroundImage: bgImage }}>
        <summary className='col-md-3 my-3' style={{ cursor: 'default' }}>
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
            <p className='mb-2' dangerouslySetInnerHTML={{ __html: dompurify.sanitize(this.getOverview()) }}></p>
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
    )
  }
}

export default Overview
