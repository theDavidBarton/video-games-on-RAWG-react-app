import React, { Component, Fragment } from 'react'
import SearchDropdownItem, { SearchDropdownItemNoResult } from './searchDropdownItem'

class Search extends Component {
  state = {
    data: null,
    dataIsReady: false,
    dropdownIsopened: false,
    keyword: ''
  }

  componentDidMount() {
    this.getRawgApi()
  }

  getRawgApi = async () => {
    if (this.state.keyword !== '') {
      try {
        const response = await fetch(`/api/videogameAutocomplete?q=${this.state.keyword.toLowerCase()}`)
        const json = await response.json()
        this.setState({ data: json, dataIsReady: true })
      } catch (e) {
        console.error(e)
      }
    }
  }

  setKeywordInInput = event => {
    this.setState({ keyword: event.target.value })
    if (event.target.value.length > 3) {
      // sends request to api only after 3 characters
      this.getRawgApi()
      this.setState({ dropdownIsopened: true })
    }
  }

  closeDropdown = () => {
    this.setState({ dropdownIsopened: false, keyword: '' })
  }

  render() {
    return (
      <Fragment>
        <div className='position-relative' style={{ zIndex: 1 }}>
          <input
            className='form-control mt-2'
            type='text'
            placeholder='Type a video game name…'
            value={this.state.keyword}
            onChange={this.setKeywordInInput}
          />
          {this.state.dataIsReady ? (
            <Fragment>
              {this.state.dropdownIsopened ? (
                <div className='bg-light w-auto text-dark position-absolute py-2 px-2'>
                  <ul className='list-unstyled mb-0'>
                    {this.state.data.count >= 1 ? (
                      this.state.data.results
                        .slice(0, 7)
                        .map(result => <SearchDropdownItem key={result.id} result={result} />)
                    ) : (
                      <SearchDropdownItemNoResult />
                    )}
                  </ul>
                  <div id='dropdownOverlay' onClick={this.closeDropdown} className='overlay-style'></div>
                </div>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </Fragment>
    )
  }
}

export default Search
