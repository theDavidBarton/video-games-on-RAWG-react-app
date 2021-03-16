import React from 'react';

export default function PlatformBadge({ data }) {
  const platformElement = data;
  return <div className='badge badge-warning platform-badge-margin'>{platformElement.platform.name}</div>;
}
