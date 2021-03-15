import React, { Fragment } from 'react';
import dompurify from 'dompurify';
import Company from './videogameCompany';
import Genre from './videogameGenre';
import DevteamMember from './videogameDevteamMember';

export default function Overview({ data }) {
  const getBackground = () => {
    try {
      let background;
      data.background_image_additional ? (background = data.background_image_additional) : (background = data.background_image);

      if (background) {
        background.match(/media\/screenshots/)
          ? (background = background.replace('media/screenshots', 'media/crop/600/400/screenshots'))
          : (background = background.replace('media/games', 'media/crop/600/400/games'));
      }
      return background;
    } catch (e) {
      console.error(e);
    }
  };

  const getPoster = () => {
    try {
      let poster;
      if (data.background_image) {
        data.background_image.match(/media\/screenshots/)
          ? (poster = data.background_image.replace('media/screenshots', 'media/crop/600/400/screenshots'))
          : (poster = data.background_image.replace('media/games', 'media/crop/600/400/games'));
      }
      return poster;
    } catch (e) {
      console.error(e);
    }
  };

  const getWebsite = () => {
    try {
      const website = data.website;
      const websiteText = website.replace(/http:\/\/|https:\/\/|www\./g, '');
      return { website, websiteText };
    } catch (e) {
      console.error(e);
    }
  };

  const getOverview = () => {
    try {
      return data.description;
    } catch (e) {
      console.error(e);
    }
  };

  const getPlaytime = () => {
    try {
      return data.playtime;
    } catch (e) {
      console.error(e);
    }
  };

  const getVotes = () => {
    try {
      return data.rating;
    } catch (e) {
      console.error(e);
    }
  };

  const getReleaseDate = () => {
    try {
      return data.released;
    } catch (e) {
      console.error(e);
    }
  };

  const bgImage = getBackground()
    ? 'linear-gradient(rgba(0,0,0,.9), rgba(52,58,64,.9)), url(' + getBackground() + ')'
    : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)';

  return (
    <section
      id='videogameSummary'
      className='row text-white img-background details-background'
      style={{ backgroundImage: bgImage }}>
      <summary className='col-md-3 my-3' style={{ cursor: 'default' }}>
        <img src={getPoster()} alt='poster' className='img-style' />
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
              <strong>Playtime:</strong> {getPlaytime() && getPlaytime() !== 0 ? getPlaytime() + ' hours' : '-'}
            </li>
            <li>
              <strong>Genre:</strong>{' '}
              {data.genres.map((genreElement, i) => (
                <Genre key={i} data={genreElement} />
              ))}
            </li>
            <li>
              <strong>Release:</strong> {getReleaseDate()}
            </li>
            <li>
              <strong>Voted:</strong> ★{getVotes()}/5
            </li>
            {getWebsite().website ? (
              <Fragment>
                <li>
                  <strong>Web:</strong>{' '}
                  <a href={getWebsite().website} target='_blank' rel='noopener noreferrer' className='text-secondary'>
                    {getWebsite().websiteText.length >= 25
                      ? getWebsite().websiteText.substring(0, 25) + '...'
                      : getWebsite().websiteText}
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
          <p className='mb-2' dangerouslySetInnerHTML={{ __html: dompurify.sanitize(getOverview()) }}></p>
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
  );
}
