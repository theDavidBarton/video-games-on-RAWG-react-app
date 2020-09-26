import React, { useState, useEffect, useCallback } from 'react'
import Trending from './homepageTrending'
import SkeletonLoad from './homepageSkeletonLoad'

export default function Homepage() {
  const [page] = useState(1)
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [topVideogameCount, setTopVideogameCount] = useState([
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
  ])

  const getRawgApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/trending?page=${page}`)
      const json = await response.json()
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [page])

  const handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    const topVidLength = topVideogameCount.length
    if (bottom & (topVidLength % 40 !== 0)) {
      let newTopVideogameCount = []
      for (let i = 0; i < topVidLength + 10; i++) {
        const iObj = { id: i + 1, value: i }
        newTopVideogameCount.push(iObj)
      }
      console.log(newTopVideogameCount)
      setTopVideogameCount(newTopVideogameCount)
    }
  }

  useEffect(() => {
    getRawgApi()
  }, [getRawgApi])

  return (
    <main className='bg-dark py-5' onClick={handleScroll}>
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
  )
}
