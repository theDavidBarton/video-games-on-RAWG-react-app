import React from 'react';

export default function Tag({ data }) {
  const tag = data;
  return <div className='badge badge-dark tag-badge-margin'>{tag.language === 'eng' ? tag.name : null}</div>;
}
