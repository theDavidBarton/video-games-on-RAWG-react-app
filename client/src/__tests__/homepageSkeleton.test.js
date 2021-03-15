import React from 'react'
import ReactDOM from 'react-dom'
import SkeletonLoad from './../components/homepageSkeletonLoad'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SkeletonLoad />, div)
})
