import React from 'react'
import ReactDOM from 'react-dom'
import Trending from './../components/homepageTrending'

jest.mock('./../components/homepageTrending')

test.skip('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Trending />, div)
})
