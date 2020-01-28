import React from 'react'
import ReactDOM from 'react-dom'
import Videogame from './../components/videogame'

jest.mock('./../components/videogame')

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Videogame />, div)
})
