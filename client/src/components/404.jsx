import React, { Component, Fragment } from 'react'

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
          <div className='col'>
            <h1>
              Back to{' '}
              <a className='text-secondary' href='/'>
                home
              </a>
            </h1>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Page404
