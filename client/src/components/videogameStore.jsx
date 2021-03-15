import React from 'react';

export default function Store({ data }) {
  const storeElement = data;
  return (
    <a href={storeElement.url} target='_blank' rel='noopener noreferrer'>
      <div className='btn btn-outline-dark m-2 p-2'>{storeElement.store.name}</div>
    </a>
  );
}
