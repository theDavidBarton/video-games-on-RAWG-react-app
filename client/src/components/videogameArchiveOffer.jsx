import React, { Fragment } from 'react';

export default function ArchiveOffer({ archiveIdentifier }) {
  const archiveUrl = `https://archive.org/details/${archiveIdentifier}`;
  return (
    <Fragment>
      <a href={archiveUrl} target='_blank' rel='noopener noreferrer'>
        <div className='btn btn-outline-info m-2 p-2'>
          <small className='smaller-free'>FREE</small> <strong>Archive.org</strong>
        </div>
      </a>
    </Fragment>
  );
}
