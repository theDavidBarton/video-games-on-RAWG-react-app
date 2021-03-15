import React, { useState, useEffect, Fragment, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import VideogameSkeletonLoad from './videogameSkeletonLoad'
import Overview from './videogameOverview'
import SimilarVideogames from './videogameSimilarVideogames'
import HeaderOnVideogames from './videogameHeader'
import Screenshots from './videogameScreenshots'
import YoutubeVideos from './videogameYoutubeVideos'
import OneyplaysVideos from './videogameOneyplaysVideos'
import Reviews from './videogameReviews'
import Stores from './videogameStores'

export default function Videogame() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [archiveIdentifier, setArchiveIdentifier] = useState(null)
  const [archiveOfferAvailable, setArchiveOfferAvailable] = useState(false)
  const [oldgameshelfIdentifier, setOldgameshelfIdentifier] = useState(null)
  const [oldgameshelfOfferAvailable, setOldgameshelfOfferAvailable] = useState(false)
  const [snesnowIdentifier, setSnesnowIdentifier] = useState(null)
  const [snesnowOfferAvailable, setSnesnowOfferAvailable] = useState(false)

  const getRawgApi = useCallback(async () => {
    try {
      // _RAWG game details call
      const response = await fetch(`/api/videogame/${id}`)
      const json = await response.json()
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [id])

  useEffect(() => {
    getRawgApi()
  }, [getRawgApi])

  const getArchiveApi = useCallback(async () => {
    const getTitleValue = () => {
      let titleValue
      data.released && data.name.includes(data.released.match(/[0-9]{4}/))
        ? (titleValue = data.name.replace(/\([0-9]{4}\)|:.*|-|\./, '').trim())
        : (titleValue = data.name.replace(/:.*|-|\./, ''))
      return titleValue
    }
    if (dataIsReady) {
      try {
        // _Archive.org call
        const titleValue = getTitleValue()
        const yearValue = data.released ? data.released.match(/[0-9]{4}/) : null

        if (yearValue) {
          const response = await fetch(`/api/searchArchive?title=${titleValue}&year=${yearValue}`)
          const json = await response.json()
          const identifier = json.response.docs.length > 0 ? json.response.docs[0].identifier : null
          if (identifier) {
            setArchiveIdentifier(identifier)
            setArchiveOfferAvailable(true)
          }
        }
      } catch (e) {
        console.error(e)
      }

      try {
        // _NES call
        const titleValue = getTitleValue()
        const isNES = data.platforms.filter(el => {
          if (el.platform.name === 'NES') return el
          return null
        })
        if (isNES.length > 0) {
          const response = await fetch(`/api/searchOldgameshelf?title=${titleValue}`)
          const json = await response.json()
          if (json[0] !== undefined) {
            setOldgameshelfIdentifier(`${json[0].slug}-${json[0].uid}`)
            setOldgameshelfOfferAvailable(true)
          }
        }
      } catch (e) {
        console.error(e)
      }

      try {
        // _SNES call
        const titleValue = getTitleValue()
        const isSNES = data.platforms.filter(el => {
          if (el.platform.name === 'SNES') return el
          return null
        })
        if (isSNES.length > 0) {
          const response = await fetch(`/api/searchSnesnow?title=${titleValue}`)
          const json = await response.json()
          if (json[0] !== undefined) {
            setSnesnowIdentifier(`${json[0].slug}-${json[0].id}`)
            setSnesnowOfferAvailable(true)
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [data, dataIsReady])

  useEffect(() => {
    getArchiveApi()
  }, [getArchiveApi])

  return (
    <Fragment>
      {dataIsReady ? (
        <main className='container'>
          <HeaderOnVideogames data={data}>{(document.title = `${data.name} | Trending on RAWG`)}</HeaderOnVideogames>
          <Overview data={data} />
          <section id='storesAndReviews' className='row'>
            <Stores
              data={data}
              archiveIdentifier={archiveIdentifier}
              archiveOfferAvailable={archiveOfferAvailable}
              oldgameshelfIdentifier={oldgameshelfIdentifier}
              oldgameshelfOfferAvailable={oldgameshelfOfferAvailable}
              snesnowIdentifier={snesnowIdentifier}
              snesnowOfferAvailable={snesnowOfferAvailable}
            />
            <Reviews data={data} />
          </section>
          <section id='misc' className='row'>
            <Screenshots data={data} />
            <YoutubeVideos data={data} />
            <OneyplaysVideos data={data} />
          </section>
          <SimilarVideogames data={data} />
        </main>
      ) : (
        <VideogameSkeletonLoad>{(document.title = 'Loading game... | Trending on RAWG')}</VideogameSkeletonLoad>
      )}
    </Fragment>
  )
}
