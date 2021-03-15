import React, { Fragment } from 'react';

export default function OldgameshelfOffer({ oldgameshelfIdentifier }) {
  const oldgameshelfUrl = `https://oldgameshelf.com/${oldgameshelfIdentifier}.html`;
  return (
    <Fragment>
      <a href={oldgameshelfUrl} target='_blank' rel='noopener noreferrer'>
        <div className='btn btn-outline-info m-2 p-2'>
          <small className='smaller-free'>FREE</small> <strong>OldGameShelf.com</strong>
        </div>
      </a>
    </Fragment>
  );
}
