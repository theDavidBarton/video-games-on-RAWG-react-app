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
    const baseUrl = window.location.href.match(/localhost/) ? '' : 'https://thedavidbarton.herokuapp.com'
    try {
      const response = await fetch(baseUrl + '/api/topRatedRecommended')
      const json = await response.json()
      this.setState({ data: json, dataIsReady: true })
    } catch (e) {
      console.error(e)
    }
  }

  getBackground = () => {
    const backgroundPath = this.state.data.background_image
    const background = backgroundPath.match(/media\/screenshots/)
      ? backgroundPath.replace('media/screenshots', 'media/resize/1280/-/screenshots')
      : backgroundPath.replace('media/games', 'media/resize/1280/-/games')
    return background
  }

  render() {
    const imagePlacement = this.state.dataIsReady
      ? 'linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(' + this.getBackground() + ')'
      : 'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)'

    return (
      <nav
        className='bg-dark pb-3'
        style={{
          backgroundImage: imagePlacement,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
        <header className='container text-white'>
          <div className='row justify-content-md-center'>
            <div className='col my-2'>
              <a href='/'>
                <img className='img-fluid text-center resized-logo' src={logo} alt='logo' />
              </a>
            </div>
            <div className='col-md-auto col-12 align-self-end order-1 order-md-0'>
              <Search />
            </div>
            <div className='col-auto align-self-end my-2'>
              <ul className='list-unstyled align-bottom'>
                <li className='my-2'>
                  <a
                    href='https://github.com/theDavidBarton/video-games-on-RAWG-react-app/'
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
        </header>
      </nav>
    )
  }
}

export default Header
