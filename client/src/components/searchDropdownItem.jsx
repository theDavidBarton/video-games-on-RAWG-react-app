import React, { Component, Fragment } from 'react'

class SearchDropdownItem extends Component {
  state = {
    result: this.props.result
  }

  render() {
    return (
      <Fragment>
        <a
          key={this.state.result.id + 'a'}
          href={`/videogame/${this.state.result.id}-${this.state.result.slug}`}
          className='text-decoration-none'>
          <li
            key={this.state.result.id + 'li'}
            className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
            {this.state.result.background_image ? (
              <img
                className='autocomplete-img-style'
                width='45'
                height='45'
                alt={this.state.result.name}
                key={this.state.result.id + 'img'}
                src={
                  this.state.result.background_image.match(/media\/screenshots/)
                    ? this.state.result.background_image.replace('media/screenshots', 'media/resize/80/-/screenshots')
                    : this.state.result.background_image.replace('media/games', 'media/resize/80/-/games')
                }
              />
            ) : (
              <svg width='45' height='45'>
                <circle cx='45' cy='45' r='45' fill='#D5D8DC' />
                Sorry, your browser does not support inline SVG.
              </svg>
            )}
            <span key={this.state.result.id + 'span'} className='mx-1'>
              {this.state.result.released &&
              this.state.result.name.includes(this.state.result.released.match(/[0-9]{4}/))
                ? this.state.result.name.replace(/\([0-9]{4}\)/, '').trim()
                : this.state.result.name}{' '}
              ({this.state.result.released ? this.state.result.released.match(/[0-9]{4}/) : 'n/a'})
            </span>
          </li>
        </a>
      </Fragment>
    )
  }
}

class SearchDropdownItemNoResult extends Component {
  render() {
    return (
      <li className='my-1 text-nowrap d-inline-block text-truncate result-list-width'>
        <span className='mx-1'>no results found...</span>
      </li>
    )
  }
}

export default SearchDropdownItem
export { SearchDropdownItemNoResult }
