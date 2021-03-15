import React, { Fragment, useState } from 'react';
import ImageGallery from './videogameImageGallery';
import ImageGalleryCloseButton from './videogameImageGalleryCloseButton';
import Screen from './videogameScreen';

export default function Screenshots({ data }) {
  const [galleryIsOpened, setGalleryIsOpened] = useState(false);

  const getClips = () => {
    try {
      let clip, poster;
      data.clip
        ? (clip = data.clip.clips[640]) &&
          (poster = data.clip['preview'].replace('media/stories-previews', 'media/crop/600/400/stories-previews'))
        : (clip = null) && (poster = null);
      return { clip, poster };
    } catch (e) {
      console.error(e);
    }
  };

  const setGalleryOpen = () => {
    setGalleryIsOpened(true);
  };

  const setGalleryClosed = () => {
    setGalleryIsOpened(false);
  };

  return (
    <section id='imageGallery' className='col-auto'>
      <header id='imageGalleryTop' className='row mt-3 px-3'>
        <h4>Screens:</h4>
        {galleryIsOpened && window.innerWidth > 765 ? (
          <Fragment>
            <div>
              <ImageGallery data={data.screenshots} />
            </div>
            <div onClick={setGalleryClosed}>
              <ImageGalleryCloseButton />
            </div>
          </Fragment>
        ) : null}
      </header>
      <section id='media' className='row mb-2' onClick={setGalleryOpen} style={{ cursor: 'pointer' }}>
        {getClips().clip ? (
          <div className='col-md-3 my-3'>
            <video
              className='img-style vid-style'
              src={getClips().clip}
              poster={getClips().poster}
              playsInline
              controls
              muted
              loop></video>
          </div>
        ) : null}
        {data.screenshots.map(screenElement => (
          <Screen key={screenElement.id} data={screenElement} />
        ))}
      </section>
    </section>
  );
}
