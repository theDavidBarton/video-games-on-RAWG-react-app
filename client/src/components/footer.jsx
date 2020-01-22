import React, { Component } from 'react'
import logoDark from './../img/logo-big-dark.svg'

class Footer extends Component {
  render() {
    return (
      <div className='bg-light'>
        <div className='container py-3'>
          <div className='row justify-content-md-center'>
            <div className='col align-self-center text-left'>
              <img alt='logo' src={logoDark} className='resized-logo' />
              <p className='text-center mt-2'>copyright © 2019 theDavidBarton</p>
            </div>
            <div className='col align-self-end'>
              <p className='lead'>
                Check out the currently trending video games on RAWG or search for retro titles in the database.
                <br />
                Powered by{' '}
                <a className='text-danger' href='https://rawg.io/'>
                  RAWG.io
                </a>
                !
              </p>
              <p>
                <span className='badge badge-dark'>#RAWG.io</span>{' '}
                <span className='badge badge-warning'>#trending</span>{' '}
                <span className='badge badge-light'>#ReactJS</span>{' '}
                <span className='badge badge-danger'>#bootstrap</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
