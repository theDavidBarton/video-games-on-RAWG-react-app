import React, { Fragment, Component } from 'react'
import PlatformBadge from './videogamePlatformBadge'

class Suggested extends Component {
  state = {
    data: this.props.data
  }

  render() {
    const suggestedElement = this.state.data
    return (
      <Fragment>
        {suggestedElement.background_image ? (
          <div
            className='col-5 m-2 p-4 suggested-game-style'
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
                {suggestedElement.platforms.map((platformElement, i) => (
                  <PlatformBadge data={platformElement} key={i} />
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
