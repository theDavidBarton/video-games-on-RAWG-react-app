import React, { useState, useEffect, useCallback } from 'react';
import Trending from './homepageTrending';
import SkeletonLoad from './homepageSkeletonLoad';

export default function Homepage() {
  const [data, setData] = useState(null);
  const [dataIsReady, setDataIsReady] = useState(false);
  const [topVideogameCount] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 4 },
    { id: 6, value: 5 },
    { id: 7, value: 6 },
    { id: 8, value: 7 },
    { id: 9, value: 8 },
    { id: 10, value: 9 }
  ]);

  const getRawgApi = useCallback(async () => {
    try {
      const response = await fetch('/api/trending');
      const json = await response.json();
      setData(json);
      setDataIsReady(true);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getRawgApi();
  }, [getRawgApi]);

  return (
    <main className='bg-dark py-5'>
      <article className='container'>
        <div className='row'>
          {topVideogameCount.map(videogames =>
            dataIsReady ? (
              <Trending key={videogames.id} value={videogames.value} data={data} />
            ) : (
              <SkeletonLoad key={videogames.id} />
            )
          )}
        </div>
      </article>
    </main>
  );
}
