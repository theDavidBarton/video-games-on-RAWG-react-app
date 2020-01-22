import React from 'react'
import ReactDOM from 'react-dom'
import Page404 from './../components/404'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Page404 />, div)
})
