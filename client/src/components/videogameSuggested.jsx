import React, { Fragment } from 'react';
import PlatformBadge from './videogamePlatformBadge';

export default function Suggested({ data }) {
  const suggestedElement = data;
  return (
    <Fragment>
      {suggestedElement.background_image ? (
        <a
          href={`/videogame/${suggestedElement.id}-${suggestedElement.slug}`}
          className='col-5 m-2 p-4 text-decoration-none suggested-game-style'
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(52,58,64,.2)), url(${
              suggestedElement.background_image.match(/media\/screenshots/)
                ? suggestedElement.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots')
                : suggestedElement.background_image.replace('media/games', 'media/crop/600/400/games')
            })`,
            backgroundSize: 'cover'
          }}>
          <h5 className='text-light suggestion-h2'>
            {suggestedElement.name.length >= 30 ? suggestedElement.name.substring(0, 30) + '...' : suggestedElement.name}
          </h5>
          <div>
            {suggestedElement.platforms
              ? suggestedElement.platforms.map((platformElement, i) => <PlatformBadge data={platformElement} key={i} />)
              : null}
          </div>
        </a>
      ) : null}
    </Fragment>
  );
}
