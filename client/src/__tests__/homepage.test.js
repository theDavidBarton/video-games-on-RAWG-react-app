import React from 'react'
import ReactDOM from 'react-dom'
import Homepage from './../components/homepage'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Homepage />, div)
})
