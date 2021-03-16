import React, { useState, useEffect, Fragment } from 'react';
import Suggested from './videogameSuggested';

export default function SimilarVideogames({ data }) {
  const [suggestedElements, setSuggestedElements] = useState(null);
  useEffect(() => {
    async function getRawgApi() {
      try {
        const response = await fetch(`/api/videogameAutocomplete?q=${data.name}`);
        const json = await response.json();
        setSuggestedElements(json);
      } catch (e) {
        console.error(e);
      }
    }
    getRawgApi();
  }, [data]);

  return (
    <Fragment>
      {suggestedElements ? (
        <aside id='similarVideogames'>
          <header className='row my-3 px-3'>
            <h4>Similar titles:</h4>
          </header>
          <section className='row mb-2 justify-content-center text-center'>
            {suggestedElements.results.slice(1).map(suggestedElement => (
              <Suggested key={suggestedElement.id} data={suggestedElement} />
            ))}
          </section>
        </aside>
      ) : null}
    </Fragment>
  );
}
