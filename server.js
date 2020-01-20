'use strict'

const express = require('express')
const request = require('request')
const path = require('path')
const userAgent = { 'User-Agent': 'video-games-on-RAWG-react-app (GitHub)' }

const optionsTrending = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games/lists/main',
  qs: {
    ordering: '-relevance',
    discover: true,
    page_size: 10
  }
}

const optionsTopRatedRecommended = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    ordering: '-added',
    page_size: 10
  }
}

const optionsVideogameDetails = {
  method: 'GET',
  headers: userAgent,
  url: undefined
}

const optionsVideogameAutocomplete = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    search: undefined
  }
}

let parsedResult

async function apiCall(options) {
  // (I.) promise to return the parsedResult for processing
  function rawgRequest() {
    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // (II.)
  try {
    parsedResult = await rawgRequest()
  } catch (e) {
    console.error(e)
  }
  return parsedResult
}

function endpointCreation() {
  try {
    const app = express()
    const port = process.env.PORT || 5000

    app.use(express.static(path.join(__dirname, 'client/build')))
    // required to serve SPA on heroku production without routing problems; it will skip only 'api' calls
    if (process.env.NODE_ENV === 'production') {
      app.get(/^((?!(api)).)*$/, function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
      })
    }

    // providing a constant endpoint for trending videogames
    app.get('/api/trending', async (req, res) => {
      res.json(await apiCall(optionsTrending))
      console.log('/api/trending endpoint has been called!')
    })

    // providing a constant endpoint for a random top rated videogame
    app.get('/api/topRatedRecommended', async (req, res) => {
      const topRatedResponse = await apiCall(optionsTopRatedRecommended)
      const randomIndex = Math.floor(Math.random() * Math.floor(10)) // one page contains exactly 10 results
      const topRatedRandomVideogame = topRatedResponse.results[randomIndex]
      res.json(topRatedRandomVideogame)
      console.log('/api/topRatedRecommended endpoint has been called!')
    })

    // providing a dynamic endpoint to videogame detail pages
    app.get('/api/videogameDetails/:rawgId', async (req, res) => {
      const id = req.params.rawgId.match(/\d+/)
      const getPrimaryDetails = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}`
        return await apiCall(optionsVideogameDetails)
      }
      const getScreenshots = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}/screenshots`
        return await apiCall(optionsVideogameDetails)
      }
      const getSuggested = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}/suggested`
        return await apiCall(optionsVideogameDetails)
      }
      const getReviews = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}/reviews`
        return await apiCall(optionsVideogameDetails)
      }
      const getYoutube = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}/youtube`
        return await apiCall(optionsVideogameDetails)
      }
      const getDevTeam = async () => {
        optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}/development-team`
        return await apiCall(optionsVideogameDetails)
      }

      const primaryDetails = await getPrimaryDetails()
      const detailsCollected = {
        ...primaryDetails,
        screenshots: parseInt(primaryDetails.screenshots_count) > 0 ? (await getScreenshots()).results : [],
        suggested: parseInt(primaryDetails.suggestions_count) > 0 ? (await getSuggested()).results : [],
        reviews: parseInt(primaryDetails.reviews_count) > 0 ? (await getReviews()).results : [],
        youtube: parseInt(primaryDetails.youtube_count) > 0 ? (await getYoutube()).results : [],
        devteam: parseInt(primaryDetails.creators_count) > 0 ? (await getDevTeam()).results : []
      }

      res.json(detailsCollected)
      console.log(`/api/videogameDetails/${id} endpoint has been called!`)
    })

    // providing a dynamic endpoint to videogame autocomplete
    app.get('/api/videogameAutocomplete', async (req, res) => {
      const query = req.query.q
      optionsVideogameAutocomplete.qs.search = query
      res.json(await apiCall(optionsVideogameAutocomplete))
      console.log(`/api/videogameAutocomplete?q=${query} endpoint has been called!`)
    })

    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
