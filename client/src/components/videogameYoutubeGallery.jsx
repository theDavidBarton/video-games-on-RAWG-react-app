import React, { useState } from 'react';
import LeftArrow from './mediaLeftArrow';
import RightArrow from './mediaRightArrow';

export default function YoutubeGallery({ data }) {
  const [activeVideo, setActiveVideo] = useState(0);

  const getVideos = () => {
    const videoPath = data;
    return videoPath.map(videoElement => videoElement.external_id);
  };

  const changeVideoNext = () => {
    if (activeVideo !== data.length - 1) setActiveVideo(activeVideo + 1);
    else setActiveVideo(0);
  };

  const changeVideoBack = () => {
    if (activeVideo !== 0) setActiveVideo(activeVideo - 1);
    else setActiveVideo(data.length - 1);
  };

  const videos = getVideos();
  const i = activeVideo;
  return (
    <main className='container'>
      <div id='galleryOverlay' className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
        <section className='row mx-auto justify-content-center text-center'>
          <button
            style={{ maxWidth: '45px' }}
            className='col-1 my-auto bg-dark text-light gallery-youtube-nav-back-style'
            onClick={changeVideoBack}>
            <LeftArrow />
          </button>
          <div className='col-10' style={{ minWidth: '480px' }}>
            <iframe
              className='gallery-youtube-style p-md-2 p-0'
              title='Youtube player'
              sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
              src={`https://youtube.com/embed/${videos[i]}?autoplay=0`}></iframe>
          </div>
          <button
            style={{ maxWidth: '45px' }}
            className='col-1 my-auto bg-dark text-light gallery-youtube-nav-next-style'
            onClick={changeVideoNext}>
            <RightArrow />
          </button>
        </section>
      </div>
    </main>
  );
}
