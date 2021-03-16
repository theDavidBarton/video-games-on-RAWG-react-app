import React, { useState } from 'react';
import LeftArrow from './mediaLeftArrow';
import RightArrow from './mediaRightArrow';

export default function ImageGallery({ data }) {
  const [activeImage, setActiveImage] = useState(0);

  const getScreens = () => {
    const screenPath = data;
    const screens = screenPath.map(screenElement =>
      screenElement.image.match(/media\/screenshots/)
        ? screenElement.image.replace('media/screenshots', 'media/resize/1280/-/screenshots')
        : screenElement.image.replace('media/games', 'media/resize/1280/-/games')
    );
    return screens;
  };

  const changeScreenNext = () => {
    if (activeImage !== data.length - 1) setActiveImage(activeImage + 1);
    else setActiveImage(0);
  };

  const changeScreenBack = () => {
    if (activeImage !== 0) setActiveImage(activeImage - 1);
    else setActiveImage(data.length - 1);
  };

  const screens = getScreens();
  const i = activeImage;
  return (
    <main className='container'>
      <div id='galleryOverlay' className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
        <section className='row mx-auto justify-content-center text-center'>
          <button
            style={{ maxWidth: '45px' }}
            className='col my-auto bg-dark text-light gallery-nav-back-style'
            onClick={changeScreenBack}>
            <LeftArrow />
          </button>
          <div className='col-10'>
            <img className='gallery-img-style p-md-2 p-0' src={screens[i]} alt='video game' />
          </div>
          <button
            style={{ maxWidth: '45px' }}
            className='col my-auto bg-dark text-light gallery-nav-next-style'
            onClick={changeScreenNext}>
            <RightArrow />
          </button>
        </section>
      </div>
    </main>
  );
}
