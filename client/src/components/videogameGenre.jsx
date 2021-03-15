import React from 'react';

export default function Genre({ data, index }) {
  const genreElement = data;
  const i = index;
  return <span key={i}>{`${i ? ', ' : ''} ${genreElement.name}`}</span>;
}
