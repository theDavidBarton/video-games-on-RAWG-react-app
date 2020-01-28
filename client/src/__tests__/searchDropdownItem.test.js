import React from 'react'
import ReactDOM from 'react-dom'
import SearchDropdownItem, { SearchDropdownItemNoResult } from './../components/searchDropdownItem'

jest.mock('./../components/searchDropdownItem')

test('should render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SearchDropdownItem />, div)
  ReactDOM.render(<SearchDropdownItemNoResult />, div)
})
