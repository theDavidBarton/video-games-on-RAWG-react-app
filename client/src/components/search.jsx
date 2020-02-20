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

  setKeywordInInput = async event => {
    await this.setState({ keyword: event.target.value })
    this.getRawgApi()
    this.setState({ dropdownIsopened: true })
  }

  closeDropdown = () => {
    this.setState({ dropdownIsopened: false, keyword: '' })
  }

  render() {
    return (
      <Fragment>
        <div className='position-relative' style={{ zIndex: 1 }}>
          <input
            aria-label='powered by RAWG.io'
            id='searchform'
            className='form-control mt-2'
            type='text'
            placeholder='Type a video game name…'
            value={this.state.keyword}
            onChange={this.setKeywordInInput}
          />
          <label htmlFor='searchform' className='d-none d-md-block input-label-style'>
            powered by RAWG.io
          </label>
          {this.state.dataIsReady ? (
            <Fragment>
              {this.state.dropdownIsopened ? (
                <div className='bg-white w-auto text-dark position-absolute dropdown-position py-2 px-2'>
                  <ul className='list-unstyled mb-0'>
                    {this.state.data.count >= 1 ? (
                      // only first eight search results displayed in the dropdown
                      this.state.data.results
                        .slice(0, 8)
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
