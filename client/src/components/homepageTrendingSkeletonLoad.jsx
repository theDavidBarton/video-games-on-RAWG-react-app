import React, { Component } from 'react'

class TrendingSkeletonLoad extends Component {
  render() {
    return (
      <div className='col-md-6'>
        <div className='card bg-dark text-decoration-none border-0'>
          <div className='text-center'>
            <div className='img-zoom-container'>
              <div className='row img-style bg-secondary text-center p-5' style={{ minHeight: '185px' }}>
                <h3 className='col bg-secondary align-self-center text-center'>
                  Loading Game...
                  <span className='sr-only'>Loading Game...</span>
                </h3>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <p className='col-10 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='col-4 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='col-6 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='col-10 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='col-4 mb-2 text-secondary bg-secondary'>&zwnj;</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingSkeletonLoad
