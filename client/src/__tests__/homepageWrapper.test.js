import React from 'react'
import ReactDOM from 'react-dom'
import HomepageWrapper from './../components/homepageWrapper'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HomepageWrapper />, div)
})
