[![Actions Status](https://github.com/theDavidBarton/video-games-on-RAWG-react-app/workflows/CI/badge.svg)](https://github.com/theDavidBarton/video-games-on-RAWG-react-app/actions)

# Videogames on RAWG

Available on Heroku: https://trending-video-games.herokuapp.com/

## a React.Js app with Express backend

![RAWG app](rawg_screenshot.jpg)

An experimental project with the RAWG api.

## Local run

**Express backend:** `yarn`, `yarn start`

**React.Js frontend:** `cd client`, `yarn` & `yarn start`

## Simplified API docs

- `GET` **/api/trending** - used on the home page
- `GET` **/api/topRatedRecommended** - used e.g. in the header components' bg image
- `GET` **/api/videogameDetails/{id}** - the content of a specific game
- `GET` **/api/videogameAutocomplete?q={query}**; `?q=` (mandatory) - used in the search input component's autocomplete

See in details: [server.js](./server.js).

# License

MIT License

Copyright (c) 2019 David Barton

# Credits

## Used data

Powered by [RAWG.io](https://rawg.io/apidocs) data. Thank you guys!

## Used font

'Arcade Classic' is under copyright (c) Jakob Fischer at www.pizzadude.dk, all rights reserved.
