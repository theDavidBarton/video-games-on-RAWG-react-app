import React from 'react'
import ReactDOM from 'react-dom'
import Search from './../components/search'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Search />, div)
})
