import React, { Fragment, Component } from 'react'
import PlatformBadge from './videogamePlatformBadge'

class Suggested extends Component {
  state = {
    data: this.props.data
  }

  render() {
    return (
      <Fragment>
        {this.state.data.background_image ? (
          <div
            className='col-lg-2 col-5 m-2 p-4 suggested-game-style'
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(52,58,64,.2)), url(${
                this.state.data.background_image.match(/media\/screenshots/)
                  ? this.state.data.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                  : this.state.data.background_image.replace('media/games', 'media/crop/600/400/games')
              })`,
              backgroundSize: 'cover'
            }}>
            <a className='text-decoration-none' href={`/videogame/${this.state.data.id}-${this.state.data.slug}`}>
              <h5 className='text-light suggestion-h2'>
                {this.state.data.name.length >= 30
                  ? this.state.data.name.substring(0, 30) + '...'
                  : this.state.data.name}
              </h5>
              <div>
                {this.state.data.platforms.map((platformElement, index) => (
                  <PlatformBadge data={platformElement} key={index} />
                ))}
              </div>
            </a>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default Suggested
