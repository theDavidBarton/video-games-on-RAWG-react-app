import React from 'react'
import ReactDOM from 'react-dom'
import TrendingList from './../components/homepageTrendingList'

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TrendingList />, div)
})
