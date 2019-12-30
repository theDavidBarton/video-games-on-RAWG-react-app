import React, { Component, Fragment } from 'react'
import logoDark from './../img/logo-big-dark.svg'

class Page404 extends Component {
  render() {
    return (
      <Fragment>
        <div className='bg-dark text-warning'>
          <div className='container text-center'>
            <div className='row'>
              <h1 className='col display-2 py-5'>404 not found</h1>
            </div>
          </div>
        </div>
        <div className='bg-white container text-center'>
          <img className='col img-fluid py-5 resized-logo' src={logoDark} alt='logo' />
          <p className='col display-4'>
            Back to{' '}
            <a className='text-secondary' href='/'>
              {' '}
              home
            </a>
            .
          </p>{' '}
        </div>
      </Fragment>
    )
  }
}
export default Page404
