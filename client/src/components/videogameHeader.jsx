import React, { Component } from 'react'
import PlatformBadge from './videogamePlatformBadge'
import Tag from './videogameTag'

class HeaderOnVideogames extends Component {
  getReleaseYear = () => {
    try {
      return this.props.data.released ? this.props.data.released.match(/[0-9]{4}/) : 'n/a'
    } catch (e) {
      console.error(e)
    }
  }

  getTitle = () => {
    try {
      let title
      this.props.data.released && this.props.data.name.includes(this.props.data.released.match(/[0-9]{4}/))
        ? (title = this.props.data.name.replace(/\([0-9]{4}\)/, '').trim())
        : (title = this.props.data.name)
      return title
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const data = this.props.data
    return (
      <header id='videogameHeader' border-bottom='1px' solid='#000'>
        <h2 className='display-4 mt-2 heading-line' id='videogameLabel' display='inline'>
          {this.getTitle()}
          <span className='lead heading-line'> ({this.getReleaseYear()}) </span>
        </h2>
        {data.platforms.map((platformBadge, i) => (
          <PlatformBadge key={i} data={platformBadge} />
        ))}
        {data.tags.length < 1 ? (
          <section id='tags' className='my-2'>
            {' '}
          </section>
        ) : (
          <section id='tags' className='my-2'>
            {data.tags.map((tag, i) => (
              <Tag key={i} data={tag} />
            ))}
          </section>
        )}
      </header>
    )
  }
}

export default HeaderOnVideogames
