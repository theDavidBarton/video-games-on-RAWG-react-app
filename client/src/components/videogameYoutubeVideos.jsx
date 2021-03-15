import React, { useState, Fragment } from 'react';
import YoutubeGallery from './videogameYoutubeGallery';
import YoutubeGalleryCloseButton from './videogameYoutubeGalleryCloseButton';
import Youtube from './videogameYoutube';

export default function YoutubeVideos({ data }) {
  const [youtubeGalleryIsOpened, setYoutubeGalleryIsOpened] = useState(false);

  const getTitle = () => {
    try {
      let title;
      data.released && data.name.includes(data.released.match(/[0-9]{4}/))
        ? (title = data.name.replace(/\([0-9]{4}\)/, '').trim())
        : (title = data.name);
      return title;
    } catch (e) {
      console.error(e);
    }
  };

  const setYoutubeGalleryOpen = () => {
    setYoutubeGalleryIsOpened(true);
  };

  const setYoutubeGalleryClosed = () => {
    setYoutubeGalleryIsOpened(false);
  };

  return (
    <Fragment>
      {data.youtube.length > 0 ? (
        <section id='youtubeGallery' className='col-auto'>
          <header id='youtubeGalleryTop' className='row mt-3 px-3'>
            <h4>On YouTube:</h4>
            <p className='w-100'>
              Check out these gameplay videos about <i>{getTitle()}</i> on YouTube.
            </p>
            {youtubeGalleryIsOpened ? (
              <Fragment>
                <div>
                  <YoutubeGallery data={data.youtube} />
                </div>
                <div onClick={setYoutubeGalleryClosed}>
                  <YoutubeGalleryCloseButton />
                </div>
              </Fragment>
            ) : null}
          </header>
          <section id='media' className='row mb-2' onClick={setYoutubeGalleryOpen} style={{ cursor: 'pointer' }}>
            {data.youtube.slice(0, 4).map(youtubeElement => (
              <Youtube key={youtubeElement.id} data={youtubeElement} classProp={''} />
            ))}
          </section>
        </section>
      ) : null}
    </Fragment>
  );
}
