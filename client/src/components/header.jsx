import React, { useState, useEffect, useCallback } from 'react'
import Search from './search'
import logo from './../img/logo-big.svg'
import github from './../img/github.svg'
import linkedin from './../img/linkedin.png'

export default function Header() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)

  const getRawgApi = useCallback(async () => {
    try {
      const response = await fetch('/api/topRatedRecommended')
      const json = await response.json()
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    getRawgApi()
  }, [getRawgApi])

  const getBackground = () => {
    const backgroundPath = data.background_image
    const background = backgroundPath.match(/media\/screenshots/)
      ? backgroundPath.replace('media/screenshots', 'media/resize/1280/-/screenshots')
      : backgroundPath.replace('media/games', 'media/resize/1280/-/games')
    return background
  }

  const imagePlacement = dataIsReady
    ? 'linear-gradient(0deg, rgba(52,58,64,1) 0%, rgba(52,58,64,0) 100%), url(' + getBackground() + ')'
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
