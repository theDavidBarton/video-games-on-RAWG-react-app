'use strict'

const express = require('express')
const request = require('request')
const path = require('path')
const userAgent = { 'User-Agent': 'video-games-on-RAWG-react-app (GitHub)' }

const optionsTrending = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    ordering: '-added'
  }
}

const optionsTopRatedRecommended = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    ordering: '-rating'
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
      const id = req.params.rawgId
      optionsVideogameDetails.url = `https://api.rawg.io/api/games/${id}`
      res.json(await apiCall(optionsVideogameDetails))
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
