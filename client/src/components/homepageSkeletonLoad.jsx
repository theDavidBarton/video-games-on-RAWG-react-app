import React, { Component } from 'react'

class SkeletonLoad extends Component {
  render() {
    return (
      <div className='col-md-6'>
        <div className='card bg-dark text-decoration-none border-0'>
          <div className='text-center'>
            <div className='img-zoom-container'>
              <div
                className='row img-style bg-secondary text-center p-5'
                style={{ minHeight: '185px', borderRadius: '0px 200px 0px 0px' }}></div>
            </div>
          </div>
          <div className='card-body'>
            <p className='w-100 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='w-50 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='w-75 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='w-100 mb-2 text-secondary bg-secondary'>&zwnj;</p>
            <p className='w-50 mb-2 text-secondary bg-secondary'>&zwnj;</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SkeletonLoad
