import React from 'react'
import ReactDOM from 'react-dom'
import TrendingSkeletonLoad from './../components/homepageTrendingSkeletonLoad'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TrendingSkeletonLoad />, div)
})
