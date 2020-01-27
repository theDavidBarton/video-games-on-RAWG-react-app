import React from 'react'
import YoutubeGallery from './videogameYoutubeGallery'

class OneyGallery extends YoutubeGallery {
  render() {
    const videos = this.getVideos()
    return (
      <main className='container'>
        <div id='galleryOverlay' className='gallery-overlay-style position-fixed text-light align-items-center d-flex'>
          <section className='row mx-auto justify-content-center text-center'>
            <div className='col-10' style={{ minWidth: '480px' }}>
              <iframe
                className='gallery-youtube-style p-md-2 p-0'
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${videos[0]}?autoplay=0`}></iframe>
            </div>
          </section>
        </div>
      </main>
    )
  }
}

export default OneyGallery
