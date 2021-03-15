import React from 'react';
import logoDark from './../img/logo-big-dark.svg';

export default function Footer() {
  return (
    <footer className='bg-light'>
      <div className='container py-3'>
        <div className='row justify-content-md-center'>
          <div className='col align-self-center text-center'>
            <img alt='logo' src={logoDark} className='resized-logo-footer' />
            <p className='text-center mt-2'>copyright © 2019 theDavidBarton</p>
          </div>
          <div className='col align-self-end'>
            <p className='lead'>
              Check out the currently trending video games on RAWG or search for retro titles in the database.
              <br />
              Powered by{' '}
              <a className='text-light bg-dark' href='https://rawg.io/'>
                RAWG.io
              </a>
              !
            </p>
            <p>
              <span className='badge badge-dark'>#RAWG.io</span> <span className='badge badge-warning'>#trending</span>{' '}
              <span className='badge badge-light'>#ReactJS</span> <span className='badge badge-danger'>#bootstrap</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
