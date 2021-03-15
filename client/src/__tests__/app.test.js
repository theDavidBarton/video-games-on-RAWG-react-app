import React from 'react'
import ReactDOM from 'react-dom'
import App from './../components/app'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
