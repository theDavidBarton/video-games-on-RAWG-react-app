import React from 'react'
import ReactDOM from 'react-dom'
import CookieBar from './../components/cookieBar'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CookieBar />, div)
})
