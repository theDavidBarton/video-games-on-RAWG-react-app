import React from 'react'
import RightArrow from './mediaRightArrow' // used here as the YouTube play symbol

export default function Youtube({ data, classProp }) {
  const youtubeElement = data.thumbnails.medium.url
  return (
    <div className='col-md-3 my-3'>
      <span className='position-absolute bg-dark text-light youtube-play-style'>
        <RightArrow />
      </span>
      {youtubeElement ? <img className={`img-style ${classProp}`} src={youtubeElement} alt='screenshot of the video' /> : null}
    </div>
  )
}
