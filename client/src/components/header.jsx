import React, { Component } from 'react'
import Search from './search'
import logo from './../img/logo-big.svg'
import github from './../img/github.svg'
import linkedin from './../img/linkedin.png'

class Header extends Component {
  state = {
    data: null,
    dataIsReady: false
  }

  componentDidMount() {
    this.getRawgApi()
  }

  getRawgApi = async () => {
    try {
      const response = await fetch('/api/topRatedRecommended')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getBackground = () => {
    const background = this.state.data.background_image
    return background
  }

  render() {
    let imagePlacement = this.state.dataIsReady
      ? 'linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

    return (
      <div
        className='bg-dark pb-3'
        style={{
          backgroundImage: imagePlacement,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
        <div className='container text-white'>
          <div className='row justify-content-md-center'>
            <div className='col'>
              <a href='/'>
                <img className='img-fluid text-center resized-logo' src={logo} alt='logo' />
              </a>
            </div>
            <div className='col-md-auto col-12 align-self-end order-1 order-md-0'>
              <Search />
              <h1 className='d-none d-md-block'>powered by RAWG.io</h1>
            </div>
            <div className='col-auto align-self-end my-2'>
              <ul className='list-unstyled align-bottom social-list-margin'>
                <li className='my-2'>
                  <a
                    href='https://github.com/theDavidBarton'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-dark social-link-style'>
                    <img className='float-left social-img-style' alt='github logo' src={github} />
                    GitHub
                  </a>
                </li>
                <li className='my-2'>
                  <a
                    href='https://linkedin.com/in/theDavidBarton/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-dark float-left social-link-style'>
                    <img className='float-left social-img-style' alt='linkedin logo' src={linkedin} />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
