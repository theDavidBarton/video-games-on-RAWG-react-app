import React from 'react';

export default function ImageGalleryCloseButton() {
  return (
    <div className='container'>
      <div className='gallery-close-position-style position-fixed'>
        <div className='row justify-content-end text-light m-3'>
          <div className='col gallery-close-style'>&#9587;</div>
        </div>
      </div>
    </div>
  );
}
