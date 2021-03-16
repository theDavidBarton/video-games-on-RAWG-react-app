import React, { useState, useEffect, Fragment, useCallback } from 'react';

export default function Trending({ data, value }) {
  const [detailsData, setDetailsData] = useState(null);

  const getRawgApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/videogame/${data.results[value].id}`);
      const json = await response.json();
      setDetailsData(json);
    } catch (e) {
      console.error(e);
    }
  }, [data, value]);

  useEffect(() => {
    getRawgApi();
  }, [getRawgApi]);

  const getPoster = () => {
    const posterPath = data.results[value].background_image;
    const poster = posterPath.match(/media\/screenshots/)
      ? posterPath.replace('media/screenshots', 'media/resize/420/-/screenshots')
      : posterPath.replace('/media/games/', '/media/resize/420/-/games/');
    return poster;
  };

  const getTitle = () => {
    let title;
    data.results[value].released && data.results[value].name.includes(data.results[value].released.match(/[0-9]{4}/))
      ? (title = data.results[value].name.replace(/\([0-9]{4}\)/, '').trim())
      : (title = data.results[value].name);
    return title;
  };

  const getOverview = () => {
    const overview = detailsData.description_raw;
    return overview;
  };

  const getPlatform = () => {
    const platformArray = detailsData.platforms;
    const platform = platformArray.map((platformElement, index) => (
      <div className='badge badge-dark platform-badge-margin' key={index + 1}>
        {platformElement.platform.name}
      </div>
    ));
    return platform;
  };

  const getRating = () => {
    const rating = data.results[value].rating;
    return rating;
  };

  const getRank = () => {
    const rank = value + 1;
    return rank;
  };

  const selectedVideogameFn = () => {
    const videogame = `/videogame/${data.results[value].id}-${data.results[value].slug}`;
    return videogame;
  };

  return (
    <div className='col-md-6'>
      <a href={selectedVideogameFn()} className='text-decoration-none'>
        <div className='card bg-dark text-white border-0'>
          <div>
            <div className='img-zoom-container card-background bg-secondary'>
              <div className='img-zoom'>
                <img className='card-img-top' alt='videogame poster' src={getPoster()} />
              </div>
            </div>
            <div className='badge-pill badge-warning position-absolute mt-4 right-badge'>★{getRating()}/5</div>
          </div>
          <div className='card-body'>
            <div className='badge-pill badge-dark display-5 position-absolute badge-position'>
              #<strong>{getRank()}</strong>
            </div>
            <h2 className='position-absolute h2-position'>
              {getTitle().length >= 30 ? getTitle().substring(0, 30) + '...' : getTitle().substring(0, 30)}
            </h2>
            <div className='position-absolute platform-badge-position'>{detailsData ? getPlatform() : null}</div>
            <div>
              {detailsData ? (
                <Fragment>{getOverview().substring(0, 350) + '...'}</Fragment>
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
  );
}
