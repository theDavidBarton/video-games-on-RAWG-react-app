import React, { Component, Fragment } from 'react'

class VideogameSkeletonLoad extends Component {
  render() {
    return (
      <Fragment>
        <div className='container'>
          <header border-bottom='1px' solid='#000'>
            <h2 className='col-6 display-4 mt-2 heading-line bg-secondary text-secondary'>&zwnj;</h2>
            <div className='col-4 badge badge-secondary text-secondary'>&zwnj;</div>
            <div className='my-2'>
              <div className='col-6 badge badge-secondary text-secondary'>&zwnj;</div>
            </div>
          </header>
          <div className='row text-white bg-dark img-background details-background'>
            <div className='col-md-3 my-3 d-none d-md-block'>
              <div className='img-style bg-secondary text-center p-5' style={{ minHeight: '170px' }}>
                &zwnj;
              </div>
            </div>
            <div className='col my-3'>
              <h3 className='bg-secondary loading-game p-4 text-center'>
                Loading Game...
                <span className='sr-only'>Loading Game...</span>
              </h3>
              <p className='col-10 mb-2 text-secondary bg-secondary'>&zwnj;</p>
              <p className='col-4 mb-2 text-secondary bg-secondary'>&zwnj;</p>
              <p className='col-6 mb-2 text-secondary bg-secondary'>&zwnj;</p>
              <p className='col-10 mb-2 text-secondary bg-secondary'>&zwnj;</p>
              <p className='col-4 mb-2 text-secondary bg-secondary'>&zwnj;</p>
              <p className='col-6 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            </div>
          </div>
          <div className='row'></div>
          <div className='row mt-3 px-3'>
            <h4 className='col-4 mb-2 text-secondary bg-secondary'>&zwnj;</h4>
          </div>
          <div className='row mt-3 px-3'>
            <h4 className='col-3 mb-2 text-secondary bg-secondary'>&zwnj;</h4>
          </div>
          <div className='img-style bg-secondary text-center p-5' style={{ minHeight: '170px' }}>
            &zwnj;
          </div>
        </div>
      </Fragment>
    )
  }
}

export default VideogameSkeletonLoad
