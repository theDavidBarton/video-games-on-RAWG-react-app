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
          <section id='cookieBar' className='bg-dark text-light sticky-top py-2'>
            <div className='container'>
              This page doesn't store cookies, but RAWG does. Check out{' '}
              <a className='text-warning' href='https://rawg.io/privacy_policy'>
                their cookie policy
              </a>{' '}
              to opt out!
              <button onClick={this.closeIt} type='button' className='close text-light'>
                <span>&times;</span>
              </button>
            </div>
          </section>
        ) : null}
      </Fragment>
    )
  }
}

export default CookieBar
