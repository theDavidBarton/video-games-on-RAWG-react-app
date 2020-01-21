import React from 'react'
import ReactDOM from 'react-dom'
import VideogameWrapper from './../components/videogameWrapper'

jest.mock('./../components/videogameWrapper')

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<VideogameWrapper />, div)
})
