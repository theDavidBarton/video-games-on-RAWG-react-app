import React, { Component, Fragment } from 'react'

class CookieBar extends Component {
  state = {
    isOpened: true
  }

  closeIt = () => {
    this.setState({ isOpened: false })
  }

  render() {
    return (
      <Fragment>
        {this.state.isOpened ? (
          <div className='bg-warning sticky-top py-2'>
            <div className='container'>
              This page doesn't store cookies, but TMDb does. Check out{' '}
              <a className='text-success' href='https://www.themoviedb.org/privacy-policy'>
                their cookie policy
              </a>{' '}
              to opt out!
              <button onClick={this.closeIt} type='button' className='close' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default CookieBar
