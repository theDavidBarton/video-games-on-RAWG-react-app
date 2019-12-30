import React, { Component } from 'react'

class TrendingMovieSkeletonLoading extends Component {
  render() {
    return (
      <div className='col-sm-4 col-xs-1'>
        <div className='card bg-dark text-decoration-none border-0'>
          <div className='text-center'>
            <div className='spinner-border text-warning justify-content-center loading-anim-size' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <img
              className='card-img-top'
              alt='movie poster'
              src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            />
          </div>
          <div className='card-body text-muted'>
            <svg width='400' height='323' viewBox='0, 0, 400,323.2323232323232'>
              <g>
                <path
                  d='M0.000 25.869 L 0.000 51.738 124.980 51.738 L 249.960 51.738 249.960 25.869 L 249.960 0.000 124.980 0.000 L 0.000 0.000 0.000 25.869 M0.000 75.505 L 0.000 90.865 200.000 90.865 L 400.000 90.865 400.000 75.505 L 400.000 60.146 200.000 60.146 L 0.000 60.146 0.000 75.505 M-0.000 114.633 L -0.000 129.993 185.449 129.991 L 370.897 129.990 370.897 114.631 L 370.897 99.272 185.449 99.272 L 0.000 99.272 -0.000 114.633 M0.000 153.597 L 0.000 169.119 200.000 169.119 L 400.000 169.119 400.000 153.597 L 400.000 138.076 200.000 138.076 L 0.000 138.076 0.000 153.597 M0.000 192.724 L 0.000 208.246 185.454 208.246 L 370.909 208.246 370.891 192.725 L 370.874 177.205 185.437 177.203 L 0.000 177.202 0.000 192.724 M0.000 231.851 L 0.000 247.373 200.000 247.373 L 400.000 247.373 400.000 231.851 L 400.000 216.330 200.000 216.330 L 0.000 216.330 0.000 231.851 M-0.000 270.816 L 0.000 286.176 185.449 286.176 L 370.897 286.176 370.897 270.818 L 370.897 255.459 185.449 255.457 L -0.000 255.456 -0.000 270.816 M0.000 308.327 L 0.000 323.363 76.475 323.363 L 152.951 323.363 152.951 308.327 L 152.951 293.290 76.475 293.290 L 0.000 293.290 0.000 308.327 '
                  stroke='none'
                  fill='#6c747c'
                  fillRule='evenodd'></path>
                <path id='path1' d='' stroke='none' fill='#70747c' fillRule='evenodd'></path>
              </g>
            </svg>{' '}
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingMovieSkeletonLoading
