import React, { Component } from 'react'
import Suggested from './videogameSuggested'

class SimilarVideogames extends Component {
  render() {
    const data = this.props.data
    return (
      <aside id='similarVideogames'>
        <header className='row my-3 px-3'>
          <h4>Similar titles:</h4>
        </header>
        <section className='row mb-2 justify-content-center text-center'>
          {data.suggested.map(suggestedElement => (
            <Suggested key={suggestedElement.id} data={suggestedElement} />
          ))}
        </section>
      </aside>
    )
  }
}

export default SimilarVideogames
