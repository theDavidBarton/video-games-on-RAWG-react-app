import React from 'react';
import PlatformBadge from './videogamePlatformBadge';
import Tag from './videogameTag';

export default function HeaderOnVideogames({ data }) {
  const getReleaseYear = () => {
    try {
      return data.released ? data.released.match(/[0-9]{4}/) : 'n/a';
    } catch (e) {
      console.error(e);
    }
  };

  const getTitle = () => {
    try {
      let title;
      data.released && data.name.includes(data.released.match(/[0-9]{4}/))
        ? (title = data.name.replace(/\([0-9]{4}\)/, '').trim())
        : (title = data.name);
      return title;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header id='videogameHeader' border-bottom='1px' solid='#000'>
      <h2 className='display-4 mt-2 heading-line' id='videogameLabel' display='inline'>
        {getTitle()}
        <span className='lead heading-line'> ({getReleaseYear()}) </span>
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
  );
}
